
Feature: le client passe une commande

  Background: Le catalogue possède des fruits
    Given les fruits suivants sont présents dans le catalogue
      | fruit |
      | pomme |
      | kiwi  |

  Scenario: Le client passe une commande avec succés
    Given le client arrive sur le catalogue
    And il ajoute les produits suivants à son panier
      | fruit | quantité |
      | pomme | 2        |
      | kiwi  | 3        |
    And il ouvre son panier
    When il passe commande
    Then ses achats ont bien été effectué

  Scenario: la commande du client échoue
    Given le client arrive sur le catalogue
    And il ajoute les produits suivants à son panier
      | fruit | quantité |
      | pomme | 2        |
      | kiwi  | 3        |
    And il ouvre son panier
    When la commande du client échoue
    Then un message d'erreur est affiché