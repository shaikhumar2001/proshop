import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import { toast } from "react-toastify";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../slices/categoriesApiSlice.js";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const CategoryListScreen = () => {
  const { pageNumber } = useParams();

  const { data: productsData } = useGetProductsQuery({ pageNumber });

  const { data, isLoading, error, refetch } = useGetCategoriesQuery({pageNumber});

  const [createCategory, { isLoading: loadingCreate, error: errorCreate }] =
    useCreateCategoryMutation();

  const [updateCategory, { isLoading: loadingUpdate }] =
    useUpdateCategoryMutation();

  const [deleteCategory, { isLoading: loadingDelete }] =
    useDeleteCategoryMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate("/admin/categorylist");
    }
  }, [data, navigate]);

  const createCategoryHandler = () => {

  }

  const editHandler = () => {}

  const deleteHandler = async (categoryId) => {
    if (window.confirm("Are you sure you want to Delete this product ?")) {
      try {
        deleteCategory(categoryId);
        if (!data) {
          navigate("/admin/categorylist");
        }
        toast.success("Product Deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <Link to="/admin/productlist" className="btn btn-light mb-4">
            Go Back
          </Link>
        </Col>
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-2" onClick={createCategoryHandler}>
            <FaEdit /> Create Category
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRODUCTS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data.categories.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td>
                    {
                      productsData.products.filter((product) => {
                        return product.category === category.name;
                      }).length
                    }
                  </td>
                  <td>
                    <Button className="btn-sm mx-2" onClick={() => editHandler(category._id)}>
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(category._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={data.pages}
            page={data.page}
            isAdmin={true}
            goBackValue={"/admin/categorylist"}
          />
        </>
      )}
    </>
  );
};

export default CategoryListScreen;
