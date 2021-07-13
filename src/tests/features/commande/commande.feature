Feature: le client passe une commande

  Background: Le catalogue possède des fruits
    Given les fruits suivants sont présents dans le catalogue
      | fruit |
      | pomme |
      | kiwi  |

  Scenario: Le client passe une commande avec succés
    Given le client arrive sur le catalogue
    And le client ajoute 2 "pomme" à son panier
    And le client ajoute 3 "kiwi" à son panier
    And le client ouvre son panier
    When le client passe commande avec succés
    Then ses achats ont bien été effectué

  Scenario: la commande du client échoue
    Given le client arrive sur le catalogue
    And le client ajoute 2 "pomme" à son panier
    And le client ajoute 3 "kiwi" à son panier
    And le client ouvre son panier
    When la commande du client échoue
    Then un message d'erreur est affiché
