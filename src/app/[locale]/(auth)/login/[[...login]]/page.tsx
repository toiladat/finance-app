'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

// ✅ Validation schema
const formSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success('✅ Login successful!', {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[280px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card
        className="w-full min-w-[482px] bg-white/10 backdrop-blur-xl border border-cyan-400/30 shadow-cyan-400/20 shadow-[0_0_40px_-5px_rgba(0,255,255,0.3)] text-white p-8 rounded-3xl"
      >
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-4xl font-semibold">
            Welcome
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg">
            Sign in to continue your adventure
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-6">
              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="email"
                      className="text-lg font-medium text-gray-200"
                    >
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      autoComplete="email"
                      className="bg-white/10 text-white placeholder-gray-400 border-white/30
                        focus-visible:ring-cyan-400 focus-visible:ring-2
                        h-14 text-lg rounded-xl px-4"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="password"
                      className="text-lg font-medium text-gray-200"
                    >
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="bg-white/10 text-white placeholder-gray-400 border-white/30
                        focus-visible:ring-cyan-400 focus-visible:ring-2
                        h-14 text-lg rounded-xl px-4"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 mt-6">
          <Button
            type="submit"
            form="form-login"
            className="w-full h-14 text-lg font-semibold bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl shadow-[0_0_20px_-5px_rgba(0,255,255,0.5)] transition-all"
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
