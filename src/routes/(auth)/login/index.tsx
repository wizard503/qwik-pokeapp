
import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';
import { Form, routeAction$, zod$,z } from '@builder.io/qwik-city';

export const useLoginUserAction = routeAction$((data,{cookie,redirect})=>{
    
    const {email, password} = data;

    if (email==="jose@google.com" && password==="123456") {
        cookie.set('message', 'Login successful', {secure: true, path: '/'});
        redirect(302, '/');

        return {
            success: true,
            message: 'Login successful',
        }
    }

    return {
        success: false,
        message: 'Login failed',
    }
}, zod$({
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
}));

export default component$(() => {

    useStylesScoped$(styles);

    const action= useLoginUserAction();

    return (
        <Form action={action} class="login-form mt-5">
            <div class="relative">
                <input
                name="email" type="text" placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input id="password" name="password" type="password" placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button type='submit'>Ingresar</button>
            </div>

            <p>
                {action.value?.success && ( <code class="text-green-500">Login successful</code>)

                }
            </p>

            {<code>
                { JSON.stringify( action.value, undefined , 2 ) }
            </code>}
        </Form>
    )
});