import * as Yup from "yup"

export const productSchema= Yup.object().shape({
    img: Yup.string().required('URL is required'),
    title: Yup.string().min(3,"Title must be more than 3 characters").required('Title is required'),
    bio: Yup.string()
      .min(5)
      .required('Bio is required')
  })