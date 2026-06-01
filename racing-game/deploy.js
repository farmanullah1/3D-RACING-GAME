import { execSync } from 'child_process'
import path from 'path'

const distPath = path.resolve('dist')

try {
  console.log('🚀 Starting deployment process...')

  // 1. Build the project
  console.log('📦 Building project...')
  execSync('npm run build', { stdio: 'inherit' })

  // 2. Go to dist directory and deploy
  console.log('📂 Deploying build folder to GitHub Pages...')
  const options = { cwd: distPath, stdio: 'inherit' }

  // Initialize git in dist
  execSync('git init', options)
  execSync('git checkout -B gh-pages', options)
  execSync('git add .', options)
  execSync('git commit -m "Deploy to GitHub Pages"', options)
  
  try {
    execSync('git remote add origin https://github.com/farmanullah1/3D-RACING-GAME.git', options)
  } catch (e) {
    execSync('git remote set-url origin https://github.com/farmanullah1/3D-RACING-GAME.git', options)
  }
  
  // Force push to gh-pages branch
  console.log('📤 Pushing build to GitHub...')
  execSync('git push -f origin gh-pages', options)

  console.log('✅ Deployment completed successfully!')
} catch (error) {
  console.error('❌ Deployment failed:', error)
  process.exit(1)
}
