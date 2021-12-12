import { randomInArray } from './random'

const names = [
  'Василий',
  'Николай',
  'Александр',
  'Алексей',
  'Анатолий',
  'Андрей',
  'Артемий',
  'Антон',
  'Валерий',
  'Владимир',
  'Владислав',
  'Григорий',
  'Дмитрий',
  'Иван',
  'Константин',
  'Михаил',
  'Леонид',
  'Павел',
  'Сергей',
  'Ярослав',
]
const lastnames = [
  'Андропов',
  'Амалиев',
  'Антипин',
  'Алексеев',
  'Богданов',
  'Бунин',
  'Бравиков',
  'Беликов',
  'Белов',
  'Вахрушев',
  'Горбунов',
  'Ельчин',
  'Илюшин',
  'Козаков',
  'Королёв',
  'Мелещук',
  'Малышев',
  'Симакин',
  'Стародубцев',
]

const informations = [
  {
    text: 'Разработчик на Excel. Пишу игровые движки в свободное время на LibreOffice.',
    labels: ['Excel', 'LibreOffice'],
  },
  {
    text: 'Разработчик на React',
    labels: ['React', 'JavaScript', 'SASS', 'styled-components', 'emotion'],
  },
  {
    text: 'Fullstack разработчик на TypeScript',
    labels: ['TypeScript', 'Node.JS', 'React'],
  },
  {
    text: 'Fullstack разработчик на TypeScript и Python',
    labels: ['TypeScript', 'Python'],
  },
  {
    text: 'Rust senior инженер. Работал в Discord',
    labels: ['Rust', 'FP'],
  },
  {
    text: 'Fullstack Vue developer, опыт работы с Python',
    labels: ['Vue', 'Python'],
  },
  {
    text: 'Bash энтузиаст',
    labels: ['Bash', 'Тег для Защитина'],
  },
]

const getRandomSpecialistData = () => {
  const info = randomInArray(informations)
  const name = info.labels.some((e) => e === 'Bash')
    ? 'Роман'
    : randomInArray(names)
  const lastname = info.labels.some((e) => e === 'Bash')
    ? 'Защитин'
    : randomInArray(lastnames)
  return {
    username: name + lastname,
    name,
    lastname,
    contact: '@tarnatovski',
    information: info.text,
    skillTags: info.labels.map((e) => ({ label: e })),
    canRemote: true,
    location: 'Россия, Санкт-Петербург',
    gender: false,
    coverUrl: false,
    avatarUrl: false,
  }
}

export default getRandomSpecialistData
