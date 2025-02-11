const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Supabase 클라이언트 설정
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// 현재 시간 기준으로 1분 전 시간 계산
const now = new Date();
const oneMinuteAgo = new Date(now.getTime() - 1 * 60 * 1000);

async function deleteOldFiles(directory = "private") {
  // 현재 디렉토리의 모든 파일과 폴더 목록 가져오기
  const { data: items, error } = await supabase.storage
    .from("images")
    .list(directory);

  if (error) {
    console.error(`Error listing items in directory '${directory}':`, error);
    return;
  }

  for (const item of items) {
    if (!item.id) {
      // 폴더인 경우
      await deleteOldFiles(`${directory}/${item.name}`);
    } else {
      const uploadDate = new Date(item.created_at);
      if (uploadDate < oneMinuteAgo) {
        const { error: deleteError } = await supabase.storage
          .from("images")
          .remove([`${directory}/${item.name}`]);

        if (deleteError) {
          console.error(
            `Failed to delete file '${directory}/${item.name}':`,
            deleteError,
          );
        } else {
          console.log(`Deleted: ${directory}/${item.name}`);
        }
      }
    }
  }
}

deleteOldFiles().then(() => console.log("File cleanup completed."));
