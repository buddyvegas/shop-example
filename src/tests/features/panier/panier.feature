Feature: le client ajoute des produits à son panier

  Background: Le catalogue possède des fruits
    Given les fruits suivants sont présents dans le catalogue
      | fruit |
      | pomme |
      | kiwi  |

  Scenario: Le client ajoute des produits à son panier
    Given le client arrive sur le catalogue
    And il ajoute les produits suivants à son panier
      | fruit | quantité |
      | pomme | 2        |
      | kiwi  | 3        |
    When il ouvre son panier
    Then les produits suivants sont présents dans son panier
      | fruit | quantité |
      | pomme | 2        |
      | kiwi  | 3        |

  Scenario: Le client vide son panier
    Given le client arrive sur le catalogue
    And il ajoute les produits suivants à son panier
      | fruit | quantité |
      | pomme | 2        |
      | kiwi  | 3        |
    When il vide son panier
    Then un message indique que son panier est vide