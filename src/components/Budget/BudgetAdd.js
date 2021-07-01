import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Input, Button } from "semantic-ui-react";
import { BudgetContext } from "../../context/BudgetContext";
import { toast } from "react-toastify";

export default function BudgetAdd() {
  const {
    disable,
    inputQuantity,
    setInputQuantity,
    inputDesc,
    inputPrice,
    setInputPrice,
    setInputDesc,
    items,
    setItems,
    descRef,
    priceRef,
  } = useContext(BudgetContext);

  const cleanInputs = () => {
    setInputQuantity(1);
    setInputDesc("");
    setInputPrice(0.0);
  };

  const addItem = () => {
    if (inputDesc !== "" && inputPrice > 0 && inputQuantity >0) {
      let _items = items.slice();
      let tmp = {
        id: uuidv4(),
        quantity: Number.parseInt(inputQuantity),
        description: inputDesc,
        price: Number.parseFloat(inputPrice),
        subtotal: inputQuantity * inputPrice,
      };
      _items.push(tmp);
      setItems(_items);
      cleanInputs();
      descRef.current.focus(true);
    } else {
        toast.error("Faltan datos para agregar Item. Verifique Cantidad, Descripcion y Precio.")
    }
  };

  const handleKeyPress = (e, origin) => {
    if (e.charCode === 13) {
      if (!origin) {
        addItem();
      } else {
        priceRef.current.focus(true);
      }
    }
  };

  const handleChangePrice = (e) => {
    if (isNaN(e)) {
      setInputPrice(0);
    } else {
      setInputPrice(e);
    }
  };

  const handleChangeCant = (e) => {
    if (isNaN(e)) {
      setInputQuantity(0);
    } else {
      setInputQuantity(e);
    }
  };

  const onFocusDesc = (e) => e.target.select();
  const onFocusPrice = (e) => e.target.select();

  return (
    <div className="budget__add">
      <h4>Agregar Items al Presupuesto</h4>
      <div className="budget__add-fields">
        <Input
          disabled={disable}
          focus
          placeholder="Cantidad"
          value={inputQuantity}
          onChange={(e) => handleChangeCant(e.target.value)}
        />
        <Input
          disabled={disable}
          focus
          placeholder="Descripción"
          value={inputDesc}
          onChange={(e) => setInputDesc(e.target.value)}
          ref={descRef}
          onKeyPress={(e) => handleKeyPress(e, "desc")}
          onFocus={(e) => onFocusDesc(e)}
        />
        <Input
          disabled={disable}
          focus
          placeholder="Precio Unitario"
          value={inputPrice}
          onChange={(e) => handleChangePrice(parseFloat(e.target.value))}
          ref={priceRef}
          onKeyPress={(e) => handleKeyPress(e)}
          onFocus={(e) => onFocusPrice(e)}
        />
        <Button
          disabled={disable}
          circular
          color="blue"
          onClick={() => addItem()}
        >
          Agregar
        </Button>
      </div>
    </div>
  );
}
