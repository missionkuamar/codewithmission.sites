import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../redux/slices/projectSlice'

export const useProjects = (filters = {}) => {
  const dispatch = useDispatch()
  const { projects, isLoading, error } = useSelector((state) => state.projects)
  
  useEffect(() => {
    dispatch(fetchProjects(filters))
  }, [dispatch, JSON.stringify(filters)])
  
  return { projects, isLoading, error }
}