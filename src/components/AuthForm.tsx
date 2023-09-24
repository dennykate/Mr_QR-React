import { useState } from "react";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Checkbox,
  Anchor,
  Stack,
  createStyles,
} from "@mantine/core";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { IconLoader2 } from "@tabler/icons-react";

import { AuthFormTypes, AuthInfos } from "../types";
import useQuery from "../hooks/useQuery";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "#ffffff",
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    flex: 1,
    maxWidth: 500,
    display: "flex",
    flexDirection: "column",
  },
  errorText: {
    color: "red",
  },
  hiddenText: {
    display: "none",
  },
}));

export default function AuthForm(props: PaperProps) {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [type, toggle] = useToggle(["login", "register"]);
  const { mutate, isLoading } = useQuery();

  const form: any = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      terms: false,
    },

    validate: {
      name: (val: string) =>
        type == "register" ? (val == "" ? "Name cann't be empty" : null) : null,
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val: string) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      password_confirmation: (val: string) =>
        type == "register"
          ? val != form.values.password
            ? "Password doesn't match"
            : null
          : null,
      terms: (val: boolean) =>
        type == "register"
          ? val
            ? null
            : "Please accept terms and conditions"
          : null,
    },
  });

  const onAuthHandler = async (values: AuthInfos) => {
    const user = await mutate(`/user/${type}`, values);

    if (user) {
      if (type == "register") {
        toast.success("Register Successful");
        toggle();
      } else {
        toast.success("Login Successful");

        setTimeout(() => {
          Cookies.set("token", JSON.stringify(user));
          navigate("/");
        }, 3000);
      }
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props} className={classes.wrapper}>
      <Text size="lg" weight={500} mb={20}>
        Welcome to Mr.Qr, {type} with
      </Text>

      <form
        onSubmit={form.onSubmit((values: AuthFormTypes) =>
          onAuthHandler(values)
        )}
      >
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              error={form.errors.name}
              radius="md"
            />
          )}

          <TextInput
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
            radius="md"
          />

          {type === "register" && (
            <>
              <PasswordInput
                label="Confirmation Password"
                placeholder="Your password"
                value={form.values.password_confirmation}
                onChange={(event) =>
                  form.setFieldValue(
                    "password_confirmation",
                    event.currentTarget.value
                  )
                }
                error={form.errors.password_confirmation}
                radius="md"
              />

              <Checkbox
                label="I accept terms and conditions"
                error={form.errors.terms}
                classNames={{
                  label: form.errors.terms && classes.errorText,
                  error: classes.hiddenText,
                }}
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            </>
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {!isLoading ? (
              upperFirst(type)
            ) : (
              <IconLoader2 className="spinner" size={16} />
            )}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
