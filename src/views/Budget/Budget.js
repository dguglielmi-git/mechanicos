import React, { useState, useEffect, useContext } from 'react';
import { size } from 'lodash';
import { Grid } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Divider } from 'primereact/divider';
import BudgetHead from '../../components/Budget/BudgetHead';
import BudgetTitleData from '../../components/Budget/BudgetTitleData';
import BudgetList from '../../components/Budget/BudgetList';
import BudgetAdd from '../../components/Budget/BudgetAdd';
import BudgetOptions from '../../components/Budget/BudgetOptions';
import BudgetPreview from '../../components/Budget/BudgetPreview';
import { BudgetContext } from '../../context/BudgetContext';
import SimpleModal from '../../components/Common/SimpleModal';
import ScrollingModal from '../../components/Common/ScrollingModal';
import { retryQuery } from '../../utils/utils';
import {
  INSERT_TEMP_BUDGET,
  EMPTY_TMP_BUDGET,
  INSERT_BUDGET,
} from '../../gql/budget';
import './Budget.scss';

export default function Budget(props) {
  const { getTmpbudget } = props;
  const [insertTmpBudget] = useMutation(INSERT_TEMP_BUDGET);
  const [emptyTmpBudget] = useMutation(EMPTY_TMP_BUDGET);
  const [insertBudget] = useMutation(INSERT_BUDGET);
  const [openValidModal, setOpenValidModal] = useState(false);
  const [openScrollModal, setOpenScrollModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    branch,
    componentRef,
    cleanFields,
    getBudgetData,
    getFinalBudget,
    handlePrint,
    issueDateSelected,
    items,
    printed,
    refetchBudget,
    refetchBudgets,
    sequence,
    setPrinted,
    setDisable,
    setItems,
    setStored,
    setTotalAmount,
    totalAmount,
    validateCompletionFields,
  } = useContext(BudgetContext);

  useEffect(() => {
    if (getTmpbudget.length > 0) {
      setItems(getTmpbudget[0].items);
      setDisable(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (size(items) > 0) {
        const sum = items.reduce((sum, item) => sum + item.subtotal, 0);
        setTotalAmount(sum);
      } else {
        setTotalAmount(0);
      }
    })();
  }, [items, setTotalAmount]);

  const persistTempBudget = async (clientData) => {
    try {
      // await insertTmpBudget({
      //   variables: {
      //     input: clientData,
      //   },
      // });
      await retryQuery(
        insertTmpBudget,
        {
          variables: {
            input: clientData,
          },
        },
        6
      );
      toast.success('Se ha guardado correctamente el presupuesto.');
    } catch (error) {
      toast.error('No se pudo guardar el Presupuesto.');
      console.log(error);
    }
  };

  const onContinue = async () => {
    setLoading(true);
    handlePrint();
    setLoading(false);
  };

  const onCancel = async () => {
    if (printed) {
      refetchBudget();
      cancelBudget();
      setDisable(true);
      setPrinted(false);
    }
    setOpenScrollModal(false);
  };

  const persistBudget = async () => {
    if (validateCompletionFields()) {
      const dataBudget = await getFinalBudget();
      dataBudget.issueDate = dataBudget.issueDate.toString();
      dataBudget.totalAmount = totalAmount;
      try {
        // await insertBudget({
        //   variables: {
        //     input: dataBudget,
        //   },
        // });
        await retryQuery(
          insertBudget,
          {
            variables: {
              input: dataBudget,
            },
          },
          6
        );
        toast.success('El presupuesto ha sido almacenado correctamente.');
        setStored(true);
        setDisable(true);
        await refetchBudgets();
        return true;
      } catch (error) {
        toast.error('No se pudo almacenar el presupuesto final.');
        console.log(error);
        return false;
      }
    } else {
      setOpenValidModal(true);
    }
  };

  const cancelBudget = async () => {
    try {
      // await emptyTmpBudget();
      await retryQuery(emptyTmpBudget, null, 6);
      cleanFields();
    } catch (error) {
      console.log(error);
    }
  };

  const getDay = () => issueDateSelected?.getDate().toString().padStart(2, '0');
  const getMonth = () =>
    (issueDateSelected?.getMonth() + 1).toString().padStart(2, '0');
  const getYear = () => issueDateSelected?.getFullYear();

  return (
    <div className="budget">
      <Grid>
        <BudgetHead cancelBudget={cancelBudget} />
        <Grid.Row>
          <Grid.Column>
            <Divider />
            <BudgetTitleData
              getTmpbudget={getTmpbudget}
              persistTempBudget={persistTempBudget}
            />
            <Divider />
            <BudgetAdd />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="budget__list">
          <BudgetList />
        </Grid.Row>
      </Grid>
      <BudgetOptions
        setOpenScrollModal={setOpenScrollModal}
        persistBudget={persistBudget}
      />
      <SimpleModal
        open={openValidModal}
        setOpen={setOpenValidModal}
        title="Formulario Incompleto !"
        body="Verifique que esten completos los campos y que el presupuesto contenga items, luego vuelva a intentarlo."
      />
      <ScrollingModal
        open={openScrollModal}
        setOpen={setOpenScrollModal}
        title="Vista Preliminar Presupuesto"
        content={
          <BudgetPreview
            branch={branch}
            componentRef={componentRef}
            getBudgetData={getBudgetData}
            items={items}
            sequence={sequence}
            totalAmount={totalAmount}
            day={getDay()}
            month={getMonth()}
            year={getYear()}
          />
        }
        onContinue={onContinue}
        onCancel={onCancel}
        loading={loading}
      />
    </div>
  );
}
