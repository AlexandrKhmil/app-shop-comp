# Foreigh Keys Restrictions

| # | from | column | to | column | type update | type delete | name
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | produdct | parent_id | product | id | cascade | set null | product_parent_id_fk |
| 2 | tag | product_id | product | id | cascade | cascade | tag_product_id_fk |
| 3 | rate | account_id | account | id | cascade | cascade | rate_account_id_fk |
| 4 | rate | product_id | prorudct | id | cascade | cascade | rate_product_id_fk |
