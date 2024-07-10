import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Image } from '@nextui-org/image'

interface PreviewFile extends File {
  preview: string
}

export const FileDropZone = ({ setFiles, files }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) } as PreviewFile)))
    },
    [setFiles]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
    multiple: false
  })

  return (
    <div className="w-1/3 flex flex-col items-center gap-2">
      <div
        {...getRootProps()}
        className="w-full h-32 flex items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <span className="text-default-500">이미지를 드롭해서 넣기</span>
        ) : (
          <span className="text-default-500">이미지를 업로드 해주세요</span>
        )}
      </div>
      <div className="w-full flex items-center justify-center">
        {files.map((file) => (
          <Image key={file.name} src={file.preview} alt={file.name} className="w-full" />
        ))}
      </div>
    </div>
  )
}
