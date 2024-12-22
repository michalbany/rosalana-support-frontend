# Rosalana Support (Frontend)

![Static Badge](https://img.shields.io/badge/ROSALANA-blue?style=for-the-badge)

**Rosalana Support** představuje místo pro získání podpory a pomoci s produkty v ekosystému Rosalana. Uživatel si může vybrat s kterým produktem má problém a následně se mu zobrazí nápověda a možnost kontaktovat podporu. 

Posílání zpráv a dalších oznámení je zajištěno pomocí **Rosalana Notifications** modulu, jakožto jednotného modulu pro oznámení v ekosystému.

> Představuje ukázku implementace frontendu pro Rosalana Accounts. 

## Funkce

Kromě zákaznické podpory slouží jako jednotné Admin Centrum napříč všemi produkty Rosalana. Fetchuje veřejné API z aplikací a je možné s nimi manipulovat. Tato funkce je přístupná pouze pro Admin uživatele. Admin uživatelé jsou uloženi v lokální databázi na Rosalana Support serveru. Tato databáze je synchronizována s Rosalana Accounts. Jedná se pouze o přiřazení role, což ukazuje krásnou implementaci mezi surovými daty v Accounts a vlastní logikou v konkrétní aplikaci.