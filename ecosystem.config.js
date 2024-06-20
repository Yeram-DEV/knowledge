module.exports = {
  apps: [
    {
      name: 'knowledge',
      script: 'pnpm',
      args: 'start',
      instances: 'max', // CPU 코어 수만큼 인스턴스를 생성합니다
      exec_mode: 'cluster', // 클러스터 모드 사용
      env: {
        NODE_ENV: 'production'
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
}
