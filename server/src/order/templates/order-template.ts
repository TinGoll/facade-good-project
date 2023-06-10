export const ORDER_TEMPLATE = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Заказ на мебельные фасады</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      width: 100% !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      margin: 0;
      padding: 0;
      line-height: 100%;
    }

    [style*='Open Sans'] {
      font-family: 'Open Sans', arial, sans-serif !important;
    }

    img {
      outline: none;
      text-decoration: none;
      border: none;
      -ms-interpolation-mode: bicubic;
      max-width: 100% !important;
      margin: 0;
      padding: 0;
      display: block;
    }

    table td {
      border-collapse: collapse;
    }

    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    .header {
      border: 1px solid #999;
    }

    .header tr {
      border-bottom: 1px solid #999;
    }

    .header tr th {
      border-left: 1px solid #999;
      border-top: 1px solid #999;
    }

    .header tr td {
      border-left: 1px solid #999;
      border-top: 1px solid #999;
      text-align: center;
    }

    .facades {
      border: 1px solid #999;
    }

    .facades thead {
      background: #e0e0e0;
    }

    .facades tr {
      border-bottom: 1px solid #999;
    }

    .facades tr th,
    .facades tr td {
      border-left: 1px solid #999;
      text-align: center;
    }

    /* Стили для печати */
    @media print {
      table td {
        padding: 0 !important;
      }
      
      .header tr th,
      .header tr td,
      .facades tr th,
      .facades tr td {
        border: 1px solid #999 !important;
      }
    }
  </style>
</head>

<body style="margin: 0; padding: 0">
  <div
    style="
      font-size: 0px;
      font-color: #ffffff;
      opacity: 0;
      visibility: hidden;
      width: 0;
      height: 0;
      display: none;
    "
  >
    Тестовое письмо
  </div>
  <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#fff">
    <tr>
      <td>
        <!-- Таблица данных -->
        <table cellpadding="10" cellspacing="0" width="100%" class="header">
          <thead>
            <tr>
              <th>{{header.date}}</th>
              <th>{{header.phone}}</th>
              <th>{{header.mail}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="3">Форма для заказа мебельных фасадов.</td>
            </tr>
            <tr>
              <td>Материал: {{header.material}}</td>
              <td>Модель: {{header.model}}</td>
              <td>Цвет: {{header.color}}</td>
            </tr>
            <tr>
              <td>Блеск: {{header.glossiness}}</td>
              <td>Присадка: {{header.drill}}</td>
              <td>Патина: {{header.patina}}</td>
            </tr>
            <tr>
              <td>Термошов: {{header.thermalseam}}</td>
              <td>Накат: {{header.roll}}</td>
              <td></td>
            </tr>
            <tr>
              <td colspan="3">{{header.note}}</td>
            </tr>
          </tbody>
        </table>
        <!-- Конец таблицы данных -->
      </td>
    </tr>
    <tr>
      <td>
        <!-- Таблица данных -->
        <table cellpadding="10" cellspacing="0" width="100%" class="facades">
          <thead>
            <tr>
              <th style="width: 80px;">Высота</th>
              <th style="width: 80px;">Ширина</th>
              <th style="width: 80px;">Кол-во</th>
              <th style="width: 130px;">Вид</th>
              <th>Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {{#each facades}}
              <tr>
                <td>{{height}}</td>
                <td>{{width}}</td>
                <td>{{amount}}</td>
                <td>{{type}}</td>
                <td>{{note}}</td>
              </tr>
            {{/each}}
          </tbody>
        </table>
        <!-- Конец таблицы данных -->
      </td>
    </tr>
    <tr>
      <td>
        <!-- Таблица данных -->
        <table cellpadding="10" cellspacing="0" width="100%" class="facades" style="margin-top: 16px;">
          <thead>
            <tr>
              <th style="width: 100px;">Вид</th>
              <th style="width: 100px;">Модель</th>
              <th style="width: 100px;">Высота/Длина</th>
              <th style="width: 80px;">Кол-во</th>
              <th>Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {{#each accessories}}
              <tr>
                <td>{{type}}</td>
                <td>{{model}}</td>
                <td>{{height}}</td>
                <td>{{amount}}</td>
                <td>{{note}}</td>
              </tr>
            {{/each}}
          </tbody>
        </table>
        <!-- Конец таблицы данных -->
      </td>
    </tr>
  </table>
</body>
</html>
`;

