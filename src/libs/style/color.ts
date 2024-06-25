// utils/colorUtils.ts
import fetch from 'node-fetch'
import { createCanvas, loadImage } from 'canvas'

interface RGB {
  r: number
  g: number
  b: number
}

const extractColors = async (imageUrl: string): Promise<RGB[]> => {
  const response = await fetch(imageUrl)
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const image = await loadImage(buffer)

  const canvas = createCanvas(image.width, image.height)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  return buildRgb(imageData.data)
}

const buildRgb = (data: Uint8ClampedArray): RGB[] => {
  const rgbValues: RGB[] = []
  for (let i = 0; i < data.length; i += 4) {
    const rgb: RGB = {
      r: data[i],
      g: data[i + 1],
      b: data[i + 2]
    }
    rgbValues.push(rgb)
  }
  return rgbValues
}

const findBiggestColorRange = (rgbValues: RGB[]): string => {
  let rMin = Number.MAX_VALUE,
    gMin = Number.MAX_VALUE,
    bMin = Number.MAX_VALUE
  let rMax = Number.MIN_VALUE,
    gMax = Number.MIN_VALUE,
    bMax = Number.MIN_VALUE

  rgbValues.forEach((pixel) => {
    rMin = Math.min(rMin, pixel.r)
    gMin = Math.min(gMin, pixel.g)
    bMin = Math.min(bMin, pixel.b)
    rMax = Math.max(rMax, pixel.r)
    gMax = Math.max(gMax, pixel.g)
    bMax = Math.max(bMax, pixel.b)
  })

  const rRange = rMax - rMin
  const gRange = gMax - gMin
  const bRange = bMax - bMin

  const biggestRange = Math.max(rRange, gRange, bRange)
  return biggestRange === rRange ? 'r' : biggestRange === gRange ? 'g' : 'b'
}

const quantization = (rgbValues: RGB[], depth: number): RGB[] => {
  const MAX_DEPTH = 4
  if (depth === MAX_DEPTH || rgbValues.length === 0) {
    const color = rgbValues.reduce(
      (prev, curr) => ({
        r: prev.r + curr.r,
        g: prev.g + curr.g,
        b: prev.b + curr.b
      }),
      { r: 0, g: 0, b: 0 }
    )

    color.r = Math.round(color.r / rgbValues.length)
    color.g = Math.round(color.g / rgbValues.length)
    color.b = Math.round(color.b / rgbValues.length)
    return [color]
  }

  const componentToSortBy = findBiggestColorRange(rgbValues)
  rgbValues.sort((p1, p2) => p1[componentToSortBy] - p2[componentToSortBy])

  const mid = Math.floor(rgbValues.length / 2)
  return [...quantization(rgbValues.slice(0, mid), depth + 1), ...quantization(rgbValues.slice(mid), depth + 1)]
}

export const getDominantColor = async (imageUrl: string): Promise<RGB> => {
  const rgbValues = await extractColors(imageUrl)
  const palette = quantization(rgbValues, 0)
  return palette[0]
}

export const getComplementaryColor = (color: RGB): RGB => {
  return {
    r: 255 - color.r,
    g: 255 - color.g,
    b: 255 - color.b
  }
}
