import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteEquipment, getAllEquipments } from "../redux/actions/equipmentActions";
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
//simport moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
const { RangePicker } = DatePicker;
function AdminHome() {
  const { equipments } = useSelector((state) => state.equipmentReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalEquipments, setTotalequipments] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEquipments());
  }, []);

  useEffect(() => {
    setTotalequipments(equipments);
  }, [equipments]);

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <a href="/addcar">ADD EQUIPMENT</a>
            </button>
          </div>
        </Col>
      </Row>

      {loading == true && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalEquipments.map((equipment) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="equipment p-2 bs1">
                <img src={equipment.image} className="carimg" />

                <div className="equipment-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{equipment.name}</p>
                    <p> Rent Per Hour {equipment.rentPerHour} /-</p>
                  </div>

                  <div className="mr-4">
                    <Link to={`/editequipment/${equipment._id}`}>
                      <EditOutlined
                        className="mr-3"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Link>

                    <Popconfirm
                      title="Are you sure to delete this equipment?"
                      onConfirm={()=>{dispatch(deleteEquipment({carid : equipment._id}))}}
                      
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default AdminHome;
