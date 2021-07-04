(function () {
  // Create the connector object
  const myConnector = tableau.makeConnector();

  // Define the schema
  myConnector.getSchema = function (schemaCallback) {
    const cols = [{
      id: 'id',
      dataType: tableau.dataTypeEnum.int,
    },
    {
      id: 'login',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'name',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'surname',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'date',
      alias: 'Year and month',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'currency',
      alias: 'Salary currency of employee',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'efforts',
      alias: 'efforts',
      dataType: tableau.dataTypeEnum.int,
    },
    {
      id: 'monthly_rate',
      alias: 'monthly_rate',
      dataType: tableau.dataTypeEnum.int,
    },
    {
      id: 'monthly_rate_currency',
      alias: 'monthly_rate_currency',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'salary',
      alias: 'salary',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'salary_currency',
      alias: 'salary_currency',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'vacation_pays',
      alias: 'vacation_pays',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'vacation_pays_currency',
      alias: 'vacation_pays_currency',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'bonus',
      alias: 'bonus',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'bonus_currency',
      alias: 'bonus_currency',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'sick_pay',
      alias: 'sick_pay',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'compensation_taxes_fees',
      alias: 'compensation_taxes_fees',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'compensation_taxes_fees_currency',
      alias: 'compensation_taxes_fees_currency',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'compensation_bank_charges',
      alias: 'compensation_bank_charges',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'compensation_bank_charges_currency',
      alias: 'compensation_bank_charges_currency',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'extra',
      alias: 'extra',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'extra_currency',
      alias: 'extra_currency',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'total',
      alias: 'total',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'delta',
      alias: 'delta',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'delta_currency',
      alias: 'delta_currency',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'bank_comission',
      alias: 'bank_comission',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'bank_comission_currency',
      alias: 'bank_comission_currency',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'patent',
      alias: 'patent',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'patent_currency',
      alias: 'patent_currency',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'hourly_rate_for_act',
      alias: 'hourly_rate_for_act',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'efforts_for_act',
      alias: 'efforts_for_act',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'exchange_rate_payment_created',
      alias: 'exchange_rate_payment_created',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'exchange_rate_payment_sent',
      alias: 'exchange_rate_payment_sent',
      dataType: tableau.dataTypeEnum.string,
    },
    {
      id: 'exchange_rate_payment_received',
      alias: 'exchange_rate_payment_received',
      dataType: tableau.dataTypeEnum.string,
    },
    ];

    const tableSchema = {
      id: 'Self_Employment',
      alias: 'Self employment',
      columns: cols,
    };

    schemaCallback([tableSchema]);
  };

  const API_KEY = 'qwerty';
  const BASE_URL = `https://se-demo.noveogroup.com/api/getPayments?token=${API_KEY}&`;
  // var BASE_URL ='../json/SelfEmployeeConnectionData.json';

  const MONTH_MAP = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];

  /**
   * Создает URL адрес для получения статистики за текущий промежуток.
   * @param {string} startDate
   * @param {string} endDate
   */
  const createURL = (startDate, endDate) => `${BASE_URL}startDate=${startDate}&endDate=${endDate}`;
  // const createURL = () => `${BASE_URL}`;

  /**
   * Возвращает строковый вариант месяца по его порядковому номеру
   * @param {number} number
   */
  // const getMonthIdByNumber = (number) => MONTH_MAP[number - 1];
  const getNumberByMonth = (month) => MONTH_MAP.indexOf(month) + 1;

  /**
   *
   * @param {object} row - Объект проекта, полученный из JSON.
   * @param {{
   *  year: number,
   *  month: number,
   *  yearIndex: number,
   * }} dateObject
   */
  const transformToTableRows = (row, targetArray) => {
    const {
      id, login, name, surname, payments,
    } = row;

    if (payments) {
      for (const year in payments) {
        for (const month in payments[year]) {
          const {
            currency, efforts, monthly_rate, monthly_rate_currency, accrued,
          } = payments[year][month];
          const {
            salary,
            salary_currency,
            vacation_pays,
            vacation_pays_currency,
            compensation_taxes_fees,
            compensation_taxes_fees_currency,
            compensation_bank_charges,
            compensation_bank_charges_currency,
            extra,
            extra_currency,
            delta,
            delta_currency,
            bank_comission,
            bank_comission_currency,
            bonus,
            bonus_currency,
            patent,
            patent_currency,
            sick_pay,
            total,
            hourly_rate_for_act,
            efforts_for_act,
            exchange_rate_payment_created,
            exchange_rate_payment_sent,
            exchange_rate_payment_received,
          } = accrued;
          const monthNum = getNumberByMonth(month);
          const date = `${year}-${monthNum < 10 ? `0${monthNum}` : monthNum}-01`;

          const tRow = {
            id,
            login,
            name,
            surname,
            date,
            currency,
            efforts,
            monthly_rate,
            monthly_rate_currency,
            salary,
            salary_currency,
            vacation_pays,
            vacation_pays_currency,
            compensation_taxes_fees,
            compensation_taxes_fees_currency,
            compensation_bank_charges,
            compensation_bank_charges_currency,
            extra,
            extra_currency,
            delta,
            delta_currency,
            bank_comission,
            bank_comission_currency,
            bonus,
            bonus_currency,
            patent,
            patent_currency,
            sick_pay,
            total,
            hourly_rate_for_act,
            efforts_for_act,
            exchange_rate_payment_created,
            exchange_rate_payment_sent,
            exchange_rate_payment_received,
          };
          targetArray.push(tRow);
        }
      }
    } else {
      return false;
    }
  };

  // Download the data
  myConnector.getData = function (table, doneCallback) {
    const {
      startDate,
      endDate,
    } = JSON.parse(tableau.connectionData);

    let tableData = [];

    $.getJSON(createURL(startDate, endDate), (jsonData) => {
      const { employees } = jsonData;

      employees.forEach((row) => {
        transformToTableRows(row, tableData);
      });

      tableData = tableData.sort((a, b) => (Date.parse(a.date) - Date.parse(b.date)));

      table.appendRows(tableData);
      doneCallback();
    });
  };

  tableau.registerConnector(myConnector);

  // Create event listeners for when the user submits the form
  $(document).ready(() => {
    $('.month-picker__input').datepicker();
    $('#submitButton').click(() => {
      const errorAlert = $('body #errorMsg');
      if (errorAlert.length > 0) {
        errorAlert.remove();
      }
      const dateObj = {
        startDate: $('#startDate').val().trim(),
        endDate: $('#endDate').val().trim(),
      };

      function isValidDate(dateStr) {
        const d = new Date(dateStr);
        return !isNaN(d.getDate());
      }

      if (isValidDate(dateObj.startDate) && isValidDate(dateObj.endDate)) {
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = 'Salary viewer';
        tableau.submit();
      } else {
        const errorMsg = `
          <div id="errorMsg" class="alert alert-danger" role="alert">
            Enter valid dates. For example, 2016-05-08.
          </div>
        `;
        $('#detailed-group').append(errorMsg);
      }
    });
  });
}());
