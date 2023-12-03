export function generateRandomID() {
	return crypto.randomUUID();
}

export function filterContent(content, filterType = "all") {
	const filteredContent = content.filter(function (content) {
		if (filterType === "all") return content;

		if (filterType === "active") return !content.completed;

		if (filterType === "completed") return content.completed;
	});
	return filteredContent;
}

export function clearCompletedContent(content) {
	return content.filter(function (content) {
		return !content.completed;
	});
}

export function generateTodoItemHTML(content) {
	return content
		.map(
			(item) =>
				`
			<li class="todo__item" data-id="${item.id}">
			<div class="${item.completed ? "circle circle--active" : "circle"}">
				<img
					src="./images/icon-check.svg"
					alt="check icon"
					class="todo__img todo__img--check-icon" />
			</div>
			<span class="todo__name">
				${item.name}
			</span>
			<button class="btn btn--todo btn--delete">
				<img
					src="./images/icon-cross.svg"
					alt="cross icon" />
			</button>
		</li>
    <hr />
			`
		)
		.join("");
}

export function renderTodoItem(element, content) {
	element.innerHTML = "";
	element.insertAdjacentHTML("afterbegin", generateTodoItemHTML(content));
}

export function changeCompletedValue(content, id) {
	const index = content.findIndex((item) => item.id === id);
	content.at(index).completed = !content.at(index).completed;
	return content;
}

export function countActiveItems(content) {
	return content.filter((item) => !item.completed).length;
}

export function renderActiveItemsCount(element, content) {
	element.textContent = `${countActiveItems(content)} items left.`;
}

export function enableDarkTheme(sunImgEl, moonImgEl) {
	sunImgEl.classList.add("header__theme-toggle--icon--show");
	sunImgEl.classList.remove("header__theme-toggle--icon--hide");

	moonImgEl.classList.remove("header__theme-toggle--icon--show");
	moonImgEl.classList.add("header__theme-toggle--icon--hide");

	document.body.classList.add("dark-theme");
}

export function disableDarkTheme(sunImgEl, moonImgEl) {
	sunImgEl.classList.remove("header__theme-toggle--icon--show");
	sunImgEl.classList.add("header__theme-toggle--icon--hide");

	moonImgEl.classList.add("header__theme-toggle--icon--show");
	moonImgEl.classList.remove("header__theme-toggle--icon--hide");

	document.body.classList.remove("dark-theme");
}
