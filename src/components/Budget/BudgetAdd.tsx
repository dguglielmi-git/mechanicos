import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Input, Button } from "semantic-ui-react";
import { useBudgetContext } from "../../context/BudgetContext";
import { toast } from "react-toastify";

export default function BudgetAdd(): React.ReactElement {
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
  } = useBudgetContext();

  const cleanInputs = (): void => {
    setInputQuantity(1);
    setInputDesc("");
    setInputPrice(0);
  };

  const addItem = (): void => {
    if (inputDesc !== "" && inputPrice > 0 && inputQuantity > 0) {
      const _items = [...items];
      const tmp = {
        id: uuidv4(),
        quantity: Number.parseInt(String(inputQuantity), 10),
        description: inputDesc,
        price: Number.parseFloat(String(inputPrice)),
        subtotal: inputQuantity * inputPrice,
      };
      _items.push(tmp);
      setItems(_items);
      cleanInputs();
      descRef.current?.focus();
    } else {
      toast.error(
        "Faltan datos para agregar Item. Verifique Cantidad, Descripcion y Precio."
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, origin?: string): void => {
    if (e.charCode === 13) {
      if (!origin) {
        addItem();
      } else {
        priceRef.current?.focus();
      }
    }
  };

  const handleChangePrice = (value: number): void => {
    if (Number.isNaN(value)) {
      setInputPrice(0);
    } else {
      setInputPrice(value);
    }
  };

  const handleChangeCant = (value: string): void => {
    const num = Number(value);
    if (Number.isNaN(num)) {
      setInputQuantity(0);
    } else {
      setInputQuantity(num);
    }
  };

  const onFocusDesc = (e: React.FocusEvent<HTMLInputElement>): void =>
    e.target.select();
  const onFocusPrice = (e: React.FocusEvent<HTMLInputElement>): void =>
    e.target.select();

  return (
    <div className="budget__add">
      <h4>Agregar Items al Presupuesto</h4>
      <div className="budget__add-fields">
        <Input
          disabled={disable}
          focus
          placeholder="Cantidad"
          value={inputQuantity}
          onChange={(_, data) => handleChangeCant(data.value)}
        />
        <Input
          disabled={disable}
          focus
          placeholder="Descripción"
          value={inputDesc}
          onChange={(_, data) => setInputDesc(data.value)}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={descRef as any}
          onKeyPress={(e: React.KeyboardEvent) => handleKeyPress(e, "desc")}
          onFocus={onFocusDesc}
        />
        <Input
          disabled={disable}
          focus
          placeholder="Precio Unitario"
          value={inputPrice}
          onChange={(_, data) =>
            handleChangePrice(Number.parseFloat(data.value) || 0)
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={priceRef as any}
          onKeyPress={(e: React.KeyboardEvent) => handleKeyPress(e)}
          onFocus={onFocusPrice}
        />
        <Button disabled={disable} circular color="blue" onClick={addItem}>
          Agregar
        </Button>
      </div>
    </div>
  );
}
