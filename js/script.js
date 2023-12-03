import { content } from "./data.js";
import {
	changeCompletedValue,
	disableDarkTheme,
	enableDarkTheme,
	filterContent,
	generateRandomID,
	renderActiveItemsCount,
	renderTodoItem,
} from "./helper.js";

const todoListEl = document.querySelector(".todos--list");
const formEl = document.querySelector(".form");
const todoFooterRightEl = document.querySelector(".todo-footer__right");
const filerBtnEls = document.querySelectorAll(".todo-footer__right .btn");
const btnClearCompletedTodoEl = document.querySelector(".btn--clear");
const todosLeftCountEl = document.querySelector(".todo-footer__left--count");

// THEME
const headerThemeToggleEl = document.querySelector(".header__theme-toggle");
const headerBgImageEl = document.querySelector(".header__bg-image");

// Togle the theme
headerThemeToggleEl.addEventListener("click", (e) => {
	const imgs = e.target.classList.contains("header__theme-toggle--icon");

	// SUN & MOON ICON
	const moonImgEl = headerThemeToggleEl.querySelector(
		".header__theme-toggle--moon-icon"
	);
	const sunImgEl = headerThemeToggleEl.querySelector(
		".header__theme-toggle--sun-icon"
	);

	if (!imgs) return;

	const { theme } = e.target.dataset;

	if (theme === "dark") {
		headerBgImageEl.setAttribute(
			"srcset",
			`
	./images/bg-mobile-dark.jpg  300w,
	./images/bg-desktop-dark.jpg 900w
	`
		);
		enableDarkTheme(sunImgEl, moonImgEl);
	}

	if (theme === "light") {
		headerBgImageEl.setAttribute(
			"srcset",
			`
	./images/bg-mobile-light.jpg  300w,
	./images/bg-desktop-light.jpg 900w
	`
		);
		disableDarkTheme(sunImgEl, moonImgEl);
	}
});

// 1) Read the input value (when the user submit the form)
formEl.addEventListener("submit", (e) => {
	e.preventDefault();

	if (!formEl.todo.value) return;

	// 2) Create a new todo item
	const newTodo = {
		name: formEl.todo.value,
		completed: false,
		id: generateRandomID(),
	};

	// 3) Add the new todo item to the list
	content.push(newTodo);
	renderTodoItem(todoListEl, content);
	renderActiveItemsCount(todosLeftCountEl, content); // Count the number of active todo items

	formEl.todo.value = "";
});

renderTodoItem(todoListEl, content);

// Check a todo item or delete it.
todoListEl.addEventListener("click", (e) => {
	const targetTodoItem = e.target.closest(".todo__item");

	if (!targetTodoItem) {
		return; // If the click is not on a todo item, do nothing
	}

	if (e.target.closest(".btn--delete")) {
		const { id } = targetTodoItem.dataset;

		const index = content.findIndex((item) => item.id === id);
		content.splice(index, 1);
		renderTodoItem(todoListEl, content);
		renderActiveItemsCount(todosLeftCountEl, content);
		return;
	}

	const { id } = targetTodoItem.dataset;
	const circleEl = targetTodoItem.querySelector(".circle");
	circleEl.classList.toggle("circle--active");
	changeCompletedValue(content, id);
	renderActiveItemsCount(todosLeftCountEl, content);
});

// Filter the todo items
todoFooterRightEl.addEventListener("click", (e) => {
	const btnEl = e.target.classList.contains("btn");

	if (!btnEl) return;

	const { filter } = e.target.dataset;

	if (document.startViewTransition) {
		document.startViewTransition(function () {
			filerBtnEls.forEach((btn) => btn.classList.remove("active"));
			e.target.classList.add("active");
		});
	}
	filerBtnEls.forEach((btn) => btn.classList.remove("active"));
	e.target.classList.add("active");

	// render new todo items
	renderTodoItem(todoListEl, filterContent(content, filter.toLowerCase()));
});

// Clear all completed todo items
btnClearCompletedTodoEl.addEventListener("click", (e) => {
	const completedTodoItems = content.filter((item) => item.completed);
	completedTodoItems.forEach((item) => {
		const index = content.findIndex((todo) => todo.id === item.id);
		content.splice(index, 1);
	});
	renderTodoItem(todoListEl, content);
});

// Count the number of active todo items
renderActiveItemsCount(todosLeftCountEl, content);
