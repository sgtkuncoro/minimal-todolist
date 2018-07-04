$(document).ready(function () {
	window.onhashchange = function () {
		var hash = location.hash.substr(1);

		var ls = JSON.parse(localStorage.getItem('tasklist'));
		$('.list-items').empty();

		if (ls !== null) {
			for (var i = 0; i < ls.length; i++) {
				if (hash == ls[i].status || hash == 'all') {
					$(".list-items").append('<li class="' + (ls[i].status == 'completed' ? 'completed' : '') + '">' +
						'<input ' + (ls[i].status == 'completed' ? 'checked' : '') + ' data-id="' + i + '" class="checkbox" type="checkbox"/>' + ls[i].text + '<a data-id="' + i + '" class="remove">x</a><hr></li>');

				}
			}
		}
	}

	var ls = JSON.parse(localStorage.getItem('tasklist'));

	if (ls !== null) {
		for (var i = 0; i < ls.length; i++) {
			$(".list-items").append('<li class="' + ls[i].status + '">' +
				'<input ' + (ls[i].status == 'completed' ? 'checked' : '') + ' data-id="' + i + '" class="checkbox" type="checkbox"/>' + ls[i].text + '<a data-id="' + i + '" class="remove">x</a><hr></li>');
		}
	}

	let item = document.getElementById('todo-list-item');
	item.addEventListener("keyup", function (e) {
		e.preventDefault();
		if (e.keyCode === 13) {
			let inputValue = $(this).val();
			let objItem = {
				status: "active",
				text: inputValue
			}

			if (ls == null) {
				ls = [];
				ls.push(objItem);

				localStorage.setItem('tasklist', JSON.stringify(ls));

				$('.list-items').empty();


				for (var i = 0; i < ls.length; i++) {
					$(".list-items").append('<li class="' + ls[i].status + '">' +
						'<input ' + (ls[i].status == 'completed' ? 'checked' : '') + ' data-id="' + i + '" class="checkbox" type="checkbox"/>' + ls[i].text + '<a data-id="' + i + '" class="remove">x</a><hr></li>');
				}

			} else {
				ls.push(objItem);
				localStorage.setItem('tasklist', JSON.stringify(ls))
				$('.list-items').empty();


				for (var i = 0; i < ls.length; i++) {
					$(".list-items").append('<li class="' + ls[i].status + '">' +
						'<input ' + (ls[i].status == 'completed' ? 'checked' : '') + ' data-id="' + i + '" class="checkbox" type="checkbox"/>' + ls[i].text + '<a data-id="' + i + '" class="remove">x</a><hr></li>');
				}
			}

			$('#todo-list-item').val("");

		}
	})

	$(document).on('change', '.checkbox', function () {
		var cekid = $(this).data('id')
		if ($(this).attr('checked')) {
			$(this).removeAttr('checked');
			ls[cekid].status = 'active'
		} else {
			$(this).attr('checked', 'checked');
			ls[cekid].status = 'completed'
		}

		$(this).parent().toggleClass('completed');

		localStorage.setItem('tasklist', JSON.stringify(ls))

	});

	$(document).on('click', '.remove', function () {

		var id = $(this).data('id')
		let idel = parseInt(id);
		ls.splice(idel, 1)

		localStorage.setItem('tasklist', JSON.stringify(ls))

		$('.list-items').empty();

		for (var i = 0; i < ls.length; i++) {
			$(".list-items").append('<li class="' + ls[i].status + '">' +
				'<input ' + (ls[i].status == 'completed' ? 'checked' : '') + ' data-id="' + i + '" class="checkbox" type="checkbox"/>' + ls[i].text + '<a data-id="' + i + '" class="remove">x</a><hr></li>');
		}
	});
});