import { Table, Button, Nav } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../components/Message";
import { useGetOrdersQuery } from "../slices/orderAPiSlice";
import { Link } from "react-router-dom";

const OrderListScreen = () => {
  const { data, error } = useGetOrdersQuery();
  const orders = data?.orders;

  return (
    <>
      <h1>Orders</h1>
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
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <Nav.Link as={Link} to={`/orders/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </Nav.Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default OrderListScreen;
