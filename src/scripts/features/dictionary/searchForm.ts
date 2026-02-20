import { ActionInputError, actions, isInputError } from "astro:actions";
import { transformDictionaryData } from "./transformDictionaryData";
import { renderResults } from "./renderResults";
import type { ActionResponse } from "@/types/dictionary";
import { searchSchema } from "@/schemas/search";
import type { ZodError, ZodIssue } from "astro:schema";
import { renderNotFound } from "./renderNotFound";

export function initSearchForm() {
  const form = document.querySelector<HTMLFormElement>("#searchbar-from");
  if (!form) throw new Error("Form element missing");
  const formInputs = form.querySelectorAll<HTMLInputElement>("input");

  const schema = searchSchema;
  type Schema = typeof schema.shape;
  type SchemaKeys = keyof Schema;

  const touched = new WeakSet<HTMLInputElement>();

  const getErrorElement = (input: HTMLInputElement) => {
    return input
      .closest("label")
      ?.querySelector<HTMLParagraphElement>(".error");
  };

  const showError = (
    input: HTMLInputElement,
    errorElement: HTMLParagraphElement,
    message: string,
  ) => {
    errorElement.textContent = message;
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", errorElement.id);
  };

  const clearError = (
    input: HTMLInputElement,
    errorElement: HTMLParagraphElement,
  ) => {
    errorElement.textContent = "";
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
  };

  const getFirstError = (issues: ZodIssue[]) => {
    const map: Map<SchemaKeys, string> = new Map();

    issues.forEach((issue) => {
      const rawField = issue.path[0];

      if (typeof rawField !== "string") return;

      if (!(rawField in schema.shape)) return;

      const field = rawField as SchemaKeys;

      if (map.has(field)) return;

      map.set(field, issue.message);
    });

    return map;
  };

  const markAllTouched = () => {
    formInputs.forEach((input) => touched.add(input));
  };

  const focusFirstInvalid = () => {
    const firstInvalid = form.querySelector<HTMLInputElement>(
      "[aria-invalid='true']",
    );
    firstInvalid?.focus();
  };

  const clearAllErrors = () => {
    form.querySelectorAll<HTMLInputElement>("[aria-invalid]").forEach((el) => {
      const errorEl = getErrorElement(el);

      if (!errorEl) return;

      clearError(el, errorEl);
    });
  };

  const validateInput = (input: HTMLInputElement) => {
    const errorElement = getErrorElement(input);

    if (!errorElement) return;

    const fieldName = input.name as SchemaKeys;

    const fieldSchema = schema.shape[fieldName];

    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(input.value);
    if (!result.success) {
      const message = result.error.issues[0].message;

      showError(input, errorElement, message);
      return;
    } else {
      clearError(input, errorElement);
      return;
    }
  };

  const handleErrors = (error: ZodError | ActionInputError<Schema>) => {
    clearAllErrors();

    const errors = getFirstError(error.issues);

    errors.forEach((message, field) => {
      const input = form.elements.namedItem(field);

      if (!(input instanceof HTMLInputElement)) return;

      const errorElement = getErrorElement(input);

      if (!errorElement) return;

      showError(input, errorElement, message);
    });
  };

  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (!touched.has(input)) return;

      validateInput(input);
    });

    input.addEventListener("blur", () => {
      touched.add(input);
      validateInput(input);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Client side

    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    const result = schema.safeParse(formObject);

    if (!result.success) {
      markAllTouched();
      handleErrors(result.error);
      focusFirstInvalid();
      return;
    }

    // Server side

    const { data, error } = await actions.getData(formData);
    if (error) {
      if (isInputError(error)) {
        handleErrors(error);
      } else {
        console.error("Action failed:", error.message);
      }
    }
    if (data) {
      const actionResponse: ActionResponse = data;

      if (actionResponse.status === "not_found") {
        const { message, resolution } = actionResponse.payload;
        renderNotFound(message, resolution);
      } else {
        const wordData = transformDictionaryData(actionResponse.payload[0]);
        renderResults(wordData);
      }
    }
  });
}
