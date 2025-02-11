const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Supabase 클라이언트 설정
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// 현재 시간 기준으로 1분 전 시간 계산
const now = new Date();
const oneMinuteAgo = new Date(now.getTime() - 1 * 60 * 1000);

async function deleteOldFiles() {
  const { data: files, error } = await supabase.storage
    .from("images")
    .list("private");

  if (error) {
    console.error("Error listing files:", error);
    return;
  }

  for (const file of files) {
    const uploadDate = new Date(file.created_at);
    if (uploadDate < oneMinuteAgo) {
      const { error: deleteError } = await supabase.storage
        .from("images")
        .remove([`private/${file.name}`]);

      if (deleteError) {
        console.error(`Failed to delete ${file.name}:`, deleteError);
      } else {
        console.log(`Deleted: ${file.name}`);
      }
    }
  }
}

deleteOldFiles().then(() => console.log("File cleanup completed."));
