import { randomInArray } from './random'

const projects = [
  {
    title: 'Project Finder',
    labels: ['Excel', 'PowerPoint'],
    coverUrl: 'https://i.imgur.com/qkgR6jF.png',
    information:
      'Требуются мобильные разработчики, желательно со стажем коммерческой разработки.',
  },
  {
    title: 'ITMO.STUDENTS',
    labels: ['React', 'TypeScript'],
    coverUrl: 'http://studyinrussia.ru/upload/iblock/2a3/2a32e1ea68c40794bd4c3fa99b792351.jpg',
    information:
      'Требуются React Native разработчики. В стеке используем Redux Saga.',
  },
  {
    title: 'FLS',
    labels: ['React', 'Node.JS'],
    information:
      'Ищем Fullstack middle-разработчика со знанием JavaScript более 5 лет',
  },
]

const getRandomProjectData = () => {
  const project = randomInArray(projects)
  return {
    title: project.title,
    location: 'ул. Колотушкина, д. 13',
    canRemote: true,
    coverUrl: project?.coverUrl || null,
    description: project.information,
    skillTags: project.labels.map((e) => ({ label: e })),
    slug: project.title,
    user: {
      username: 'jarvis394',
      name: 'Василий',
      lastname: 'Пупкин',
      contact: '@tarnatovski',
      information:
        'Разработчик на Excel. Пишу игровые движки в свободное время на LibreOffice.',
      skillTags: [{ name: 'Excel' }, { name: 'LibreOffice' }],
    },
  }
}

export default getRandomProjectData
