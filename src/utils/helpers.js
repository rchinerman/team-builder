export function getAllianceColorFromName(alliance) {
  switch (alliance) {
    case 'assassin':
      return '#7C26A7';
    case 'bloodbound':
      return '#3E5020';
    case 'brawny':
      return '#5A0A0A';
    case 'deadeye':
      return '#916C0C';
    case 'demon':
      return '#C51C1C';
    case 'demonhunter':
      return '#4C004C';
    case 'dragon':
      return '#D54214';
    case 'druid':
      return '#105010';
    case 'elusive':
      return '#406893';
    case 'heartless':
      return '#3AA14A';
    case 'human':
      return '#009F7A';
    case 'hunter':
      return '#D16042';
    case 'inventor':
      return '#CF740E';
    case 'knight':
      return '#CBB51C';
    case 'mage':
      return '#40A7AF';
    case 'primordial':
      return '#004646';
    case 'savage':
      return '#A13916';
    case 'scaled':
      return '#2C2668';
    case 'scrappy':
      return '#818B1C';
    case 'shaman':
      return '#1C603A';
    case 'troll':
      return '#765036';
    case 'warlock':
      return '#B354A7';
    case 'warrior':
      return '#124A85';
    default:
      return '#FFFFFF';
  }
}

export function formatAlliance(alliance) {
  return alliance.toLowerCase().replace(/\W/g, '');
}
