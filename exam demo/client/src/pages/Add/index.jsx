import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {  Space, Table } from 'antd';
import {
  useDeleteProductMutation,
  useGetProductQuery,
  usePostProductMutation,
} from "../../service/productApi";
import { useParams } from 'react-router-dom';
import { productSchema } from "../../validations/productVal";
import Swal from "sweetalert2"
import { render } from "server/reply";
const Add = () => {
  const {id}=useParams();
  const { data:products, refetch } = useGetProductQuery();
  const [postProduct] = usePostProductMutation();
  const [deleteProduct]=useDeleteProductMutation();
  const formik = useFormik({
    initialValues: {
      img: "",
      title: "",
      bio: "",
    },
    onSubmit:async (values,{resetForm}) => {
        await postProduct(values).then(()=>{
          Swal.fire({
            title: "Added Succesfully!",
            text: "You clicked the button!",
            icon: "success"
          });
          refetch();
          resetForm();
        })
    },
    validationSchema:productSchema
  });



  const columns = [
    {
      title: 'Image',
      dataIndex: 'img',
     render:(text,record)=>{
       return <img src={record.img} alt={text} width={100} height={50} />
     }
    
    },
    {
      title: 'Title',
      dataIndex: 'title',
     
     
    },
    {
      title: 'Bio',
      dataIndex: 'bio',
    
    },
    {
      title:'Action',
      render:(_,record)=>{
      return  <Button onClick={()=>{
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
              await deleteProduct(record._id);
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
        }}>
          delete
        </Button>
      }
    }
  ]
  return (
    <div style={{ width: "40%", margin: "30px auto", padding: "100px 0" }}>
      <h3 style={{ textAlign: "center", padding: "20px 0" }}>Add Product</h3>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <TextField
          id="outlined-basic"
          name="img"
          label="Image"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.img}
        />
        {formik.touched.img && formik.errors.img && (<span style={{color:'red'}}>{formik.errors.img}</span> )}
        <TextField
          id="outlined-basic"
          name="title"
          label="Title"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
         {formik.touched.title && formik.errors.title && (<span style={{color:'red'}}>{formik.errors.title}</span> )}
        <TextField
          id="outlined-basic"
          name="bio"
          label="Bio"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.bio}
        />
         {formik.touched.bio && formik.errors.bio && (<span style={{color:'red'}}>{formik.errors.bio}</span> )}
        <Button variant="contained" type="submit" style={{marginBottom:'20px'}}>Add</Button>
      </form>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
      </Space>
      <Table columns={columns} dataSource={products?.data}  />
    </div>
  );
};

export default Add;
