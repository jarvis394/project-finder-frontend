const getRandomProjectData = () => ({
  title: 'Project Finder',
  location: 'ул. Колотушкина, д. 13',
  canRemote: true,
  coverUrl: null,
  description:
    'Требуются мобильные разработчики, желательно со стажем коммерческой разработки не менее 80 лет. Обязательно знание PowerPoint.',
  skillTags: [
    {
      label: 'Express',
    },
    {
      label: 'Django',
    },
    {
      label: 'Django',
    },
    {
      label: 'Python',
    },
    {
      label: 'Django',
    },
    {
      label: 'Django',
    },
  ],
  slug: 'project-finder',
  user: {
    username: 'jarvis394',
    name: 'Василий',
    lastname: 'Пупкин',
    contact: '@tarnatovski',
    information:
      'Разработчик на Excel. Пишу игровые движки в свободное время на LibreOffice.',
    skillTags: [{ name: 'Excel' }, { name: 'LibreOffice' }],
  },
})

export default getRandomProjectData
