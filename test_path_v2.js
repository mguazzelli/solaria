const fs = require('fs');
const path_str = '/d/Solaria_Data/migrated_articles';
console.log('Exists with slash:', fs.existsSync(path_str));
console.log('Contents:', fs.readdirSync(path_str));
