Feature: Запрос должен содержать все необходимые параметры

  Scenario Outline: При отсутствии параметра возвращается ошибка
    Given в теле запроса не передано свойство "<Key>"
    When я посылаю запрос для рассчета количества позиций
    Then приходит ответ с кодом 200
    And в теле ответа содержится ошибка "Необходимо передать параметры: amount (number), standard (text), isSample (boolean), hasPackage (boolean)"

    Examples:
      | Key        |
      | amount     |
      | standard   |
      | hasPackage |
      | isSample   |