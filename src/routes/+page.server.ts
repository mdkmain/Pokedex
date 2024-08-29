import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
	const { session } = await safeGetSession();

	// If the user is already logged in, redirect them to the pokedex page
	if (session) {
		throw redirect(303, '/pokedex');
	}

	return { url: url.origin };
};

export const actions: Actions = {
	default: async (event) => {
		const {
			request,
			locals: { supabase }
		} = event;

		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		// Validate email format
		const validEmail = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email);
		if (!validEmail) {
			return fail(400, { errors: { email: 'Please enter a valid email address' }, email });
		}

		// Validate password (e.g., ensuring it's not empty)
		if (!password) {
			return fail(400, { errors: { password: 'Please enter your password' }, email });
		}

		// Attempt to sign in with email and password
		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			return fail(400, {
				success: false,
				email,
				message: 'Invalid email or password. Please try again.'
			});
		}

		throw redirect(303, '/pokedex');
	}
};
