import { supabase } from "../lib/supabase";

export const authRepository = {
  async signup(name, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (data.user) {
      return {
        ...data.user,
        userName: data.user.user_metadata.name,
      };
    } else {
      throw new Error(error);
    }
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error);
    return {
      ...data.user,
      userName: data.user.user_metadata.name,
    };
  },

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();
    if (error != null) throw new Error(`えらー：${error}`);
    if (data.session == null) return;
    return {
      ...data.session.user,
      userName: data.session.user.user_metadata.name,
    };
  },
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error != null) throw new Error(error);
    return true;
  },
};
