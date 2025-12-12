import { NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { join } from 'path'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const folder = searchParams.get('folder')
  const type = searchParams.get('type') // 'slideshow' or 'background'
  const project = searchParams.get('project') // For project-specific images

  if (type === 'background') {
    // Handle background image request
    try {
      const backgroundsDir = join(process.cwd(), 'public', 'images', 'backgrounds')
      const files = await readdir(backgroundsDir)
      
      // Get first image file found
      const backgroundFile = files.find(file => {
        const ext = file.toLowerCase().substring(file.lastIndexOf('.'))
        return IMAGE_EXTENSIONS.includes(ext)
      })

      if (backgroundFile) {
        return NextResponse.json({ image: `/images/backgrounds/${backgroundFile}` })
      }
      
      return NextResponse.json({ image: null })
    } catch (error) {
      console.error('Error reading backgrounds directory:', error)
      return NextResponse.json({ image: null })
    }
  }

  // Handle project images
  if (folder === 'projects' && project) {
    try {
      const projectDir = join(process.cwd(), 'public', 'images', 'projects', project)
      const files = await readdir(projectDir)
      
      // Filter for image files and sort alphabetically
      const imageFiles = files
        .filter(file => {
          const ext = file.toLowerCase().substring(file.lastIndexOf('.'))
          return IMAGE_EXTENSIONS.includes(ext)
        })
        .sort()
        .map(file => `/images/projects/${project}/${file}`)

      return NextResponse.json({ images: imageFiles })
    } catch (error) {
      // Directory doesn't exist or error reading - return empty array
      return NextResponse.json({ images: [] })
    }
  }

  if (!folder || (folder !== 'professional' && folder !== 'personal')) {
    return NextResponse.json({ error: 'Invalid folder' }, { status: 400 })
  }

  try {
    const imagesDir = join(process.cwd(), 'public', 'images', folder)
    const files = await readdir(imagesDir)
    
    // Filter for image files and sort alphabetically
    const imageFiles = files
      .filter(file => {
        const ext = file.toLowerCase().substring(file.lastIndexOf('.'))
        return IMAGE_EXTENSIONS.includes(ext)
      })
      .sort()
      .map(file => `/images/${folder}/${file}`)

    return NextResponse.json({ images: imageFiles })
  } catch (error) {
    console.error('Error reading images directory:', error)
    return NextResponse.json({ images: [] })
  }
}

