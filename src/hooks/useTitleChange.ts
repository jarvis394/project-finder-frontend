import useRoute from './useRoute'

const useTitleChange = () => {
  const route = useRoute()
  const newTitle = route.title ? route.title + ' / project-finder' : 'project-finder'
  if (document.title !== newTitle) document.title = newTitle
}

export default useTitleChange
