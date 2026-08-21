import { supabase } from '../config/supabase.js';

export const uploadResumeToSupabase = async (file) => {
  const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;

  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (error) throw new Error(`Supabase upload failed: ${error.message}`);

  const { data: publicUrlData } = supabase.storage
    .from('resumes')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
};