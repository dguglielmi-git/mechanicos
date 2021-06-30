import React, { useContext, useState, useEffect } from "react";
import { size } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Image } from "semantic-ui-react";
import { BudgetContext } from "../../context/BudgetContext";
import Logo from "../../assets/logo-bw.png";
import { numToDollarRounded } from "../../utils/utils";

export default function BudgetPreview() {
  const {
    componentRef,
    issueDateSelected,
    items,
    totalAmount,
    getBudgetData,
    branch,
    sequence,
  } = useContext(BudgetContext);
  const [itemList, setItemList] = useState([]);

  // Validate size of item list
  useEffect(() => {
    if (size(items) < 25) {
      let start = size(items);

      let _items = items.slice();

      for (let i = start; i < 25; i++) {
        let template = {
          id: uuidv4(),
          quantity: null,
          description: "",
          price: null,
          subtotal: null,
        };
        _items.push(template);
      }
      setItemList(_items);
    }
  }, [items]);

  const DivP = ({ cls, val }) => (
    <div className={cls}>
      <p>{val}</p>
    </div>
  );

  const DivH4 = ({ cls, val }) => (
    <div className={cls}>
      <h4>{val}</h4>
    </div>
  );

  return (
    <div>
      <div className="budget-preview" ref={componentRef}>
        <div className="header-letter">
          <p>X</p>
        </div>
        <div className="header-budget">
          <div className="header-budget__left-box">
            <div className="left-box-title">
              <Image src={Logo} height="60px" />
              <DivP
                cls="left-box-title__label"
                val="de Juan Carlos Guglielmi"
              />
              <DivP
                cls="left-box-title__address"
                val="Blas Parera 710 - Villa Bosch"
              />
              <DivP cls="left-box-title__phone" val="Tel. 15-5262-0300" />
              <DivP
                cls="left-box-title__vat-label"
                val="Responsable Monotributo"
              />
            </div>
          </div>
          <div className="header-budget__right-box">
            <div className="right-box-title">
              <DivP cls="right-box-title__header" val="PRESUPUESTO" />
              <DivP
                cls="right-box-title__subtitle"
                val="DOCUMENTO NO VÁLIDO COMO FACTURA"
              />
              <div className="right-box-title__invoice">
                <DivP cls="right-box-title__invoice-caption" val="Nº" />
                <DivP
                  cls="right-box-title__invoice-number"
                  val={
                    branch.toString().padStart(4, "0") +
                    "-" +
                    sequence.toString().padStart(8, "0")
                  }
                />
              </div>
              <div className="right-box-title__date">
                <DivP cls="right-box-title__date-caption" val="FECHA" />
                <div className="right-box-title__date-value">
                  <DivP
                    cls="right-box-title__date-value-day"
                    val={issueDateSelected
                      .getDate()
                      .toString()
                      .padStart(2, "0")}
                  />
                  <DivP
                    cls="right-box-title__date-value-month"
                    val={(issueDateSelected.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}
                  />
                  <DivP
                    cls="right-box-title__date-value-year"
                    val={issueDateSelected.getFullYear()}
                  />
                </div>
              </div>
              <div className="right-box-title__cuit">
                <DivP cls="right-box-title__cuit-caption" val="CUIT Nº" />
                <DivP cls="right-box-title__cuit-input" val="20-31603348-3" />
              </div>
              <div className="right-box-title__iibb">
                <DivP cls="right-box-title__iibb-caption" val="Ing. Brutos" />
                <DivP cls="right-box-title__iibb-input" val="20-31603348-3" />
              </div>
              <div className="right-box-title__start">
                <DivP cls="right-box-title__start-caption" val="Inicio Act." />
                <DivP cls="right-box-title__start-input" val="01/03/2021" />
              </div>
            </div>
          </div>
        </div>
        <div className="client-info">
          <div className="client-info__label-mr">
            <DivP cls="client-info__label-mr-caption" val="Señor(es)" />
            <DivP
              cls="client-info__label-mr-input"
              val={getBudgetData("client")}
            />
          </div>
          <div className="client-info__label-address">
            <DivP cls="client-info__label-address-caption" val="Domicilio" />
            <DivP
              cls="client-info__label-address-input"
              val={getBudgetData("address")}
            />
            <DivP
              cls="client-info__label-address-city-caption"
              val="Localidad"
            />
            <DivP
              cls="client-info__label-address-city-input"
              val={getBudgetData("city")}
            />
          </div>
          <div className="client-info__label-vehicle">
            <DivP cls="client-info__label-vehicle-caption" val="Coche" />
            <DivP
              cls="client-info__label-vehicle-input"
              val={getBudgetData("vehicle")}
            />
            <DivP cls="client-info__label-vehicle-brand-caption" val="Marca" />
            <DivP
              cls="client-info__label-vehicle-brand-input"
              val={getBudgetData("brand")}
            />
          </div>
          <div className="client-info__label-plate">
            <DivP cls="client-info__label-plate-caption" val="Patente" />
            <DivP
              cls="client-info__label-plate-input"
              val={getBudgetData("plate")}
            />
          </div>
        </div>
        <div className="title-header">
          <DivP cls="title-header__quantity" val="Cantidad" />
          <DivP cls="title-header__detail" val="Detalle" />
          <DivP cls="title-header__unit" val="P. Unit." />
          <DivP cls="title-header__subtotal" val="Importe" />
        </div>
        <div className="items-detail">
          {itemList.map((el, index) => (
            <div className="items-detail__row">
              <DivH4 cls="items-detail__row-quantity" val={el.quantity} />
              <DivH4 cls="items-detail__row-description" val={el.description} />
              <DivH4
                cls="items-detail__row-unit"
                val={el.price && numToDollarRounded(el.price)}
              />
              <DivH4
                cls="items-detail__row-subtotal"
                val={el.subtotal && numToDollarRounded(el.subtotal)}
              />
            </div>
          ))}
        </div>
        <div className="budget-summary">
          <DivH4 cls="budget-summary__caption" val="TOTAL" />
          <DivH4
            cls="budget-summary__figure"
            val={totalAmount && numToDollarRounded(totalAmount)}
          />
        </div>
        <DivP
          cls="budget-expiration"
          val="***El presente documento tiene una validez de 30 días desde su fecha de emisión"
        />
      </div>
    </div>
  );
}
