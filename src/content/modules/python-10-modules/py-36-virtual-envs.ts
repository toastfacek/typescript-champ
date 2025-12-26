import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-36-virtual-envs',
  slug: 'virtual-envs',
  title: 'Virtual Environments',
  description: 'Learn to manage project dependencies with virtual environments and pip.',
  order: 36,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 70,
  prerequisites: ['py-35-packages'],
  tags: ['venv', 'pip', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'virtual-env',
      term: 'Virtual Environment',
      definition: 'An isolated Python environment with its own packages, separate from the system Python.',
      syntax: 'python -m venv myenv',
      example: {
        code: 'python -m venv myenv\\nsource myenv/bin/activate  # Unix\\nmyenv\\\\Scripts\\\\activate  # Windows',
        explanation: 'Creates and activates a virtual environment.',
      },
      whyItMatters: 'Virtual environments prevent package conflicts between projects.',
    },
    {
      id: 'pip',
      term: 'pip',
      definition: 'Python\'s package installer. Used to install, upgrade, and remove packages.',
      syntax: 'pip install package_name',
      example: {
        code: 'pip install requests\\npip install -r requirements.txt',
        explanation: 'Install a package or from a requirements file.',
      },
      whyItMatters: 'pip gives you access to thousands of third-party libraries.',
    },
  ],
  steps: [
    {
      id: 'step-1-why',
      order: 1,
      type: 'instruction',
      title: 'Why Virtual Environments?',
      content: '# The Problem\n\nDifferent projects may need different package versions:',
      codeExample: {
        code: '# Project A needs:\n# requests==2.25.0\n# django==3.1\n\n# Project B needs:\n# requests==2.28.0\n# django==4.0\n\n# Solution: Each project gets its own virtual environment\n# with its own set of installed packages!',
        language: 'python',
        highlight: [9, 10],
      },
    },
    {
      id: 'step-2-create',
      order: 2,
      type: 'instruction',
      title: 'Creating and Using venv',
      content: '# Virtual Environment Commands',
      codeExample: {
        code: '# Create a virtual environment\npython -m venv myenv\n\n# Activate it:\n# On macOS/Linux:\nsource myenv/bin/activate\n\n# On Windows:\nmyenv\\Scripts\\activate\n\n# Your prompt changes:\n(myenv) $ \n\n# Deactivate when done:\ndeactivate',
        language: 'python',
        highlight: [2, 6, 9, 15],
      },
    },
    {
      id: 'step-3-pip',
      order: 3,
      type: 'instruction',
      title: 'Installing Packages',
      content: '# Using pip',
      codeExample: {
        code: '# Install a package\npip install requests\n\n# Install specific version\npip install requests==2.28.0\n\n# Upgrade a package\npip install --upgrade requests\n\n# List installed packages\npip list\n\n# Show package info\npip show requests\n\n# Uninstall\npip uninstall requests',
        language: 'python',
        highlight: [2, 5, 8, 11, 17],
      },
    },
    {
      id: 'step-4-requirements',
      order: 4,
      type: 'instruction',
      title: 'Requirements Files',
      content: '# Sharing Dependencies',
      codeExample: {
        code: '# Save current packages to file\npip freeze > requirements.txt\n\n# requirements.txt looks like:\n# requests==2.28.0\n# django==4.0.0\n# numpy==1.23.0\n\n# Install from requirements file\npip install -r requirements.txt\n\n# Best practice for projects:\n# 1. Create venv\n# 2. Install packages\n# 3. pip freeze > requirements.txt\n# 4. Commit requirements.txt to git',
        language: 'python',
        highlight: [2, 10, 15, 16],
      },
    },
    {
      id: 'step-5-quiz',
      order: 5,
      type: 'quiz',
      question: 'What command saves your installed packages to a file?',
      options: [
        {
          id: 'a',
          text: 'pip save requirements.txt',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'pip freeze > requirements.txt',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'pip export requirements.txt',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'pip list > requirements.txt',
          isCorrect: false,
        },
      ],
      explanation: '`pip freeze` outputs all installed packages in requirements format. The `>` redirects output to a file.',
    },
  ],
}
