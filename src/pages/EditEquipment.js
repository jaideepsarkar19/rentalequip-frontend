import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { addEquipment, editEquipment, getAllEquipments } from "../redux/actions/equipmentActions";
function EditEquipment({ match }) {
  const { equipments} = useSelector((state) => state.equipmentReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [equipment, setequipment] = useState();
  const [totalequipments, settotalequipments] = useState([]);
  useEffect(() => {
    if (equipments.length == 0) {
      dispatch(getAllEquipments());
    } else {
      //find by id
      settotalequipments(equipments);
      setequipment(equipments.find((o) => o._id == match.params.equipmentid));
      console.log(equipment);
    }
  }, [equipments]);

  function onFinish(values) {
    values._id = equipment._id;

    dispatch(editEquipment(values));
    console.log(values);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className='p-2'>
          {totalequipments.length > 0 && (
            <Form
              initialValues={equipment}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Equipment</h3>

              <hr />
            
              <Form.Item
              //Adding form for the data
                name="name"
                label="Equipment name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image url"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="rentPerHour"
                label="Rent per hour"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Weight"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Type / Description"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <div className="text-right">
                <button className="btn1">Edit Equipment</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditEquipment;
