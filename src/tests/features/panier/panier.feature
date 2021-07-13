Feature: le client ajoute des produits à son panier

  Background: Le catalogue possède des fruits
    Given les fruits suivants sont présents dans le catalogue
      | fruit |
      | pomme |
      | kiwi  |

  Scenario: Le client ajoute des produits à son panier
    Given le client arrive sur le catalogue
    And le client ajoute 2 "pomme" à son panier
    And le client ajoute 3 "kiwi" à son panier
    When le client visualise son panier
    Then il possède 2 "pomme" dans son panier
    And il possède 3 "kiwi" dans son panier

  Scenario: Le client vide son panier
    Given le client arrive sur le catalogue
    And le client ajoute 2 "pomme" à son panier
    And le client ajoute 3 "kiwi" à son panier
    And le client ouvre son panier
    When il vide son panier
    Then un message indique que son panier est vide

