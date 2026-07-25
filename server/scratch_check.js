import { dbQuery } from './src/config/db.js';

async function reset() {
  try {
    await dbQuery.run('DELETE FROM api_cache');
    console.log('✅ Cleared api_cache table');
    await dbQuery.run('DELETE FROM games');
    console.log('✅ Cleared games table');
    await dbQuery.run('DELETE FROM game_stats');
    console.log('✅ Cleared game_stats table');
    console.log('\nDatabase reset complete. Restart the server to re-sync games.');
  } catch (err) {
    console.error('Error resetting database:', err.message);
  } finally {
    process.exit(0);
  }
}

setTimeout(reset, 800);
