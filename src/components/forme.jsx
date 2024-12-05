//formulaire de recherche
import React, { useState } from "react";
import "./styles/forme.css";
import { DatePicker, Select, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { Col, Container } from "reactstrap";


const { Option } = Select;
const layout = {
  labelCol: { span: 18 },
  wrapperCol: { span: 25 },
};

const Forme = () => {
  const [lieu, setlieu] = useState("");
  const [service, setservice] = useState("");
  const [startDate, setStartDate] = useState(null);

  const Navigate = useNavigate();

  const handlelieuChange = (value) => {
    setlieu(value);
  };

  const handleserviceChange = (value) => {
    setservice(value);
  };

  const handleSubmit = () => {
    Navigate(
      `/offreDispo?lieu=${lieu}&service=${service}&startDate=${startDate}`
    );
  };
  
  return (
    <Container>
      <Col>
        <Form
          className="form"
          onFinish={handleSubmit}
          layout="vertical"
          {...layout}
        >
          <div >
            <div className="form_item" >
              <Form.Item className="select__group" label="Lieux" name="Lieux">
                <Select
                  placeholder="Selectionez une ville"
                  onChange={handlelieuChange}
                  value={lieu}
                >
                  <Option value="" disabled selected>
                    Selectionez une ville
                  </Option>
                  <Option value="Tunis">Tunis</Option>
                  <Option value="Sousse">Sousse</Option>
                  <Option value="Sfax">Sfax</Option>
                  <Option value="Gabès">Gabès</Option>
                  <Option value="Bizerte">Bizerte</Option>
                  <Option value="Kairouan">Kairouan</Option>
                  <Option value="Tozeur">Tozeur</Option>
                  <Option value="Monastir">Monastir</Option>
                  <Option value="Nabeul">Nabeul</Option>
                  <Option value="Mahdia">Mahdia</Option>
                  <Option value="Hammamet">Hammamet</Option>
                  <Option value="Djerba">Djerba</Option>
                  <Option value="Zarzis">Zarzis</Option>
                  <Option value="Beja">Beja</Option>
                  <Option value="Jendouba">Jendouba</Option>
                  <Option value="Kef">Kef</Option>
                  <Option value="Sidi Bouzid">Sidi Bouzid</Option>
                  <Option value="Kasserine">Kasserine</Option>
                  <Option value="Siliana">Siliana</Option>
                  <Option value="Medenine">Medenine</Option>
                  <Option value="Tataouine">Tataouine</Option>
                  <Option value="Gafsa">Gafsa</Option>
                  <Option value="Kebili">Kebili</Option>
                  <Option value="Zaghouan">Zaghouan</Option>
                  <Option value="Manouba">Manouba</Option>
                  <Option value="Ben Arous">Ben Arous</Option>
                  <Option value="Ariana">Ariana</Option>
                  <Option value="La Marsa">La Marsa</Option>
                  <Option  value="Lac, Tunis">Lac, Tunis</Option>
                  <Option value="Gammarth">Gammarth</Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="select__group"
                label="Service"
                name="service"
              >
                <Select
                  placeholder="Sélectionnez un service"
                  onChange={handleserviceChange}
                  value={service}
                >
                  <Option value="" disabled selected>
                  Sélectionnez un service
                  </Option>
                  <Option value="salle des fetes">
                    Salle des fetes
                  </Option>
                  <Option value="Coiffure et maquiage">
                    Coiffure et maquiage
                  </Option>
                  
                </Select>
              </Form.Item>
              
              <Form.Item name="Date" label="Date">
                <DatePicker
                  className="date-picker" /* Ajoutez la classe ici */
                  showTime={{
                    format: "HH:mm",
                    minuteStep: 30,
                  }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={(value, dateString) => setStartDate(dateString)}
                  pickerInputStyle={{ color: "#FF854E" }}
                />
              </Form.Item>
              <Form.Item
              label=" ">
                <button htmlType="submit" style={{ backgroundColor: "#FF854E",borderRadius:"10px" }}>
                Chercher
                </button>
              </Form.Item>
              
            
            </div>
            
          </div>
          
        </Form>
      </Col>
    </Container>
  );
};

export default Forme;
