# Database

## Tables 

### Character
- Name (id, not null, unique)
- Role (Support / DPS / Tank)
- description (text)
- imageUrl

### Event
- id (not null, unique, id)
- description
- type (kill / heal / special)
- character (not obligatory, who can use it)

### Team
- id (not null, unique, id)
- SupportA (character.id)
- SupportB (character.id)
- DPSA (character.id)
- DPSB (character.id)
- Tank (character.id)
=> when entering a new team, always alphabetical order

### History
- idUser (user.id) id
- date (dateTime, unique) id
- teamA (team.id)
- teamB (team.id)
- winner (team.id)

### USER
- id (not null, unique, id)
- username (not null)
- role (admin / normal)


## Trigger 
- character.role obligatory either Support, Tank or DPS
- user.username can't contain $!...
- event.description must contain at least one $1


# Change
Charley's idea
Pros : 
- better for traduction
- faster (especially if wifi problems)

Cons : 
- don't need the database then