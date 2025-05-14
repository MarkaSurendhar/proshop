// import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../slices/productApiSlice";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Paginate from "../components/Paginate";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, error, refetch } = useGetProductsQuery({ pageNumber });

  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are u sure you want create a new product")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure , you want delete")) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success("Product Deleted Successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            create Product
          </Button>
        </Col>
      </Row>
      {error ? (
        <Message variant="danger">
          {error?.data?.message ||
            error?.message ||
            error?.error ||
            "An error occurred"}
        </Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate page={data?.page} pages={data?.pages} isAdmin={true} />
    </>
  );
};
export default ProductListScreen;
