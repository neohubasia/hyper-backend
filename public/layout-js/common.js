/* *
 * Scripts
 */

function dataTableIndexRenderer() {
  return function (d, type, row, meta) {
    return parseInt("" + meta.row) + 1;
  };
}

function dataTableTextSlicer() {
  return function (d, type, row) {
    if (d) return d.slice(0, 10) + "......";
    return "";
  };
}

function dataTableThumbnailRenderer() {
  return function (d, type, row) {
    var html =
      '<div class="">' +
      '<img class="img border" src="' +
      d +
      '" height="30" width="30" title="Supplier Logo" alt="" /></div>';
    return html;
  };
}

function dataTableTypeRenderer() {
  return function (d, type, row) {
    return d !== ""
      ? '<span class="badge badge-primary" style="font-size:12px;">' +
          d.toUpperCase() +
          "</span>"
      : '<span class="badge badge-primary" style="font-size:12px;">UNDEFINED</span>';
  };
}

function dataTableActiveRenderer() {
  return function (d, type, row) {
    return d == true
      ? '<span class="badge badge-success" style="font-size:12px;">Active</span>'
      : '<span class="badge badge-danger" style="font-size:12px;">Inactive</span>';
  };
}

function dataTableMoneyRenderer() {
  return function (d, type, row) {
    return `<h4 style="text-align: right"><span class="badge badge-info" style="font-size:12px;">
          ${dataTableThousandSeperator(d)}
        </span></h4>`;
  };
}

function dataTableThousandSeperator(d) {
  return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function dataTableActionsRenderer(editUrl, access, icons) {
  access = access.split(",");
  return function (d, type, row) {
    var id = row.id || "#";
    var html =
      '<div class="btn-group float-right" role="group" aria-label="Actions">';
    if (access[0] == "1" && access[1] == "1") {
      // read && write access
      html += `<a class="btn btn-sm border list-action" href="./${editUrl}/${id}" title="Edit">
        <img src="${icons.edit}" height="22" width="22"/></a>`;
    }
    if (access[2] == "1") {
      // delete access
      html += `<a class="btn btn-sm border list-action" role="button" data-toggle="modal" data-target="#dialogDeleteConfirm" 
         data-loading-text="Deleting..." data-id="${id}" title="Delete">
        <img src="${icons.delete}" height="22" width="22"/></a>`;
    }
    return html + "</div>";
  };
}

function dataTableDetailActionsRenderer(detailUrl, access, icons) {
  access = access.split(",");
  return function (d, type, row) {
    var id = row._id || row.id || "#";
    var html = `<div class="btn-group float-right" role="group" aria-label="Actions">`;
    if (access[0] == "1" && access[1] == "1") {
      // read && write access
      html += `<a class="btn btn-sm border list-action" href="./${detailUrl}/${id}" title="Edit">
        <img src="${icons.detail}" height="22" width="22"/></a>`;
    }
    return html;
  };
}

function dataTableDateRenderer() {
  return function (d, type, row) {
    return moment(new Date(d)).format("DD/MM/YYYY");
  };
}

function dataTableDateTimeRenderer() {
  return function (d, type, row) {
    return moment(new Date(d)).format("DD/MM/YYYY hh:mm A");
  };
}

function isValidEmail(email) {
  return /^([a-zA-Z])+([a-zA-Z0-9_.+-])+\@(([a-zA-Z])+\.+?(com|co|in|org|net|edu|info|gov|vekomy))\.?(com|co|in|org|net|edu|info|gov)?$/.test(
    email
  );
}

$(function () {
  $(".list-group-item").on("click", function () {
    var eleIcon = this.getElementsByTagName("span")[2];
    var isExpand = $(this).closest("a.list-group-item").attr("aria-expanded"); // index return undefined

    eleIcon.classList.contains("fa-plus")
      ? eleIcon.classList.replace("fa-plus", "fa-minus")
      : eleIcon.classList.replace("fa-minus", "fa-plus");

    // $('.list-group .collapse').removeClass('show');
  });
});

$(".list-group .list-group-item-menu").on("click", function () {
  $(".list-group").find(".active").removeClass("active");
  $(this).addClass("active");
});

$('[data-hide="alert"]').on("click", function () {
  $(this).closest("div.alert").hide();
});

$('input[role="number"]')
  .on("keydown", function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if (
      $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
      // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  })
  .on("paste", function (e) {
    // Get pasted data via clipboard API
    var clipboardData = e.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData("Text").toUpperCase();
    if (!/^[\d.]+/.test(pastedData)) {
      e.stopPropagation();
      e.preventDefault();
    }
  });

$('input[role="phone"]')
  .on("keydown", function (e) {
    // Allow: backspace, delete, tab, escape, enter, comma, space and dash
    if (
      $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 188, 32, 173]) !== -1 ||
      // Allow: Plus
      (e.keyCode === 61 && e.shiftKey === true) ||
      // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  })
  .on("paste", function (e) {
    // Get pasted data via clipboard API
    var clipboardData = e.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData("Text").toUpperCase();
    if (!/^[\d/]+/.test(pastedData)) {
      e.stopPropagation();
      e.preventDefault();
    }
  });

$('input[role="time"]')
  .on("keydown", function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if (
      $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
      // Allow: colon
      (e.keyCode === 59 && e.shiftKey === true) ||
      // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  })
  .on("paste", function (e) {
    // Get pasted data via clipboard API
    var clipboardData = e.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData("Text").toUpperCase();
    if (!/^[\d/]+[:\.][\d/]+/.test(pastedData)) {
      e.stopPropagation();
      e.preventDefault();
    }
  });

$('input[role="date"]')
  .on("keydown", function (e) {
    // Allow: backspace, delete, tab, escape, enter and slash
    if (
      $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 191]) !== -1 ||
      // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  })
  .on("paste", function (e) {
    // Get pasted data via clipboard API
    var clipboardData = e.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData("Text").toUpperCase();
    if (!/^[\d/]+/.test(pastedData)) {
      e.stopPropagation();
      e.preventDefault();
    }
  });

$('input[editable="false"]')
  .on("keydown paste input propertychange", function (e) {
    e.stopPropagation();
    e.preventDefault();
  })
  .attr("autocomplete", "off")
  .attr("tabIndex", -1)
  .attr("focusable", false);

var nowDate = new Date(Date.now());
$("input.date")
  .datepicker({
    format: "dd/mm/yyyy",
    autoclose: true,
    todayHighlight: true,
    orientation: "bottom",
  })
  .on("hide", function (e) {
    if (typeof e.date == "undefined" && $(this).val() == "") {
      $(this).val(window.date.format(nowDate, "DD/MM/YYYY"));
    }
  });

$("input.fromdate")
  .datepicker({
    format: "dd/mm/yyyy",
    autoclose: true,
    todayHighlight: true,
    orientation: "bottom",
  })
  .on("changeDate", function (e) {
    var toid = $(this).attr("to");
    if (typeof toid !== "undefined" && toid != "") {
      $("input[id='" + toid + "']").datepicker("setStartDate", e.date);
    } else {
      $("input.todate").datepicker("setStartDate", e.date);
    }
  });

$("input.todate")
  .datepicker({
    format: "dd/mm/yyyy",
    autoclose: true,
    todayHighlight: true,
    orientation: "bottom",
  })
  .on("changeDate", function (e) {
    var fromid = $(this).attr("from");
    if (typeof fromid !== "undefined" && fromid != "") {
      $("input[id='" + fromid + "']").datepicker("setEndDate", e.date);
    } else {
      $("input.fromdate").datepicker("setEndDate", e.date);
    }
  });

$(".selectpicker").select2({ width: "100%" });

$("#btnExcel").on("click", function (e) {
  if (!table.data().count()) {
    swalWarning({
      position: "top",
      icon: "warning",
      title: "Warning Message",
      text: "No data available in table to export",
    });
    return false;
  }

  table.button(".buttons-excel").trigger();
});

$("#btnPdf").on("click", function (e) {
  if (!table.data().count()) {
    swalWarning({
      position: "top",
      icon: "warning",
      title: "Warning Message",
      text: "No data available in table to export",
    });
    return false;
  }

  table.button(".buttons-pdf").trigger();
});

$("#btnPrint").on("click", function (e) {
  if (!table.data().count()) {
    swalWarning({
      position: "top",
      icon: "warning",
      title: "Warning Message",
      text: "No data available in table to print",
    });
    return false;
  }

  table.button(".buttons-print").trigger();
});

$("#dialogDeleteConfirm")
  .on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var id = button.data("id");
    $(this).attr("data-id", id);
    $(this)
      .find("#dialogAccept")
      .on("click", function (ev) {
        var deleteUrl = "./api" + pageEntry + "/" + id;
        handleDelete(deleteUrl, token, function () {
          table.ajax.reload();
        });
      });
  })
  .on("hide.bs.modal", function (event) {
    $(this).attr("data-id", "");
    $(this).find("#dialogAccept").off("click");
  });

function handleDelete(url, token, cb) {
  $.ajax({
    url: url,
    type: "delete",
    headers: { authorization: "Bearer " + token },
    success: function (data) {
      if (typeof data !== "undefined" && data.status == "SUCCESS") {
        $("#alertDeleteError").hide();
        $("#alertDeleteSuccess").show();
        if (typeof cb === "function") {
          cb();
        }
      } else if (typeof data !== "undefined" && data.status == "FAIL") {
        $("#alertDeleteSuccess").hide();
        $("#alertDeleteError").show();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(errorThrown);
    },
  });
}

function handleAlert(args, redirect = true) {
  if (args.status == "SUCCESS") {
    $("#alertTitle").html("Success: ");
    $("#alertMessage").html("Save Successful.");
    $("#alert").addClass("alert-success").show();

    var postFrm = $("#postSuccessForm");
    window.setTimeout(function () {
      if (redirect) postFrm.submit();
      $("#alert").removeClass("alert-success").hide();
    }, 1 * 1000);
  } else {
    $("#alertTitle").html("Error: ");
    $("#alertMessage").html("Save Unsuccessful.");
    $("#alert").addClass("alert-danger").show();

    window.setTimeout(function () {
      $("#alert").removeClass("alert-danger").hide();
    }, 1 * 1000);
  }
}

function ajaxLoadOption(args) {
  var url = args.url || "#",
    type = args.type || "GET",
    selectId = args.selectId || "#",
    filerObj = args.filterObj || {},
    showKey = args.showKey || "",
    token = args.token;

  $.ajax({
    type: type,
    url: url,
    headers: { authorization: "Bearer " + token },
    data: { ...filerObj },
    success: function (data) {
      var items = "";
      items +=
        "<option value='' disabled selected> -- Please Select -- </option>";
      if (data.status == "SUCCESS" && $.isArray(data.data)) {
        $.each(data.data, function (i, item) {
          items +=
            "<option value='" + item["id"] + "'>" + item[showKey] + "</option>";
        });
      } else {
        $.each(Object.entries(data.data), function (i, item) {
          items += "<option value='" + item[0] + "'>" + item[0] + "</option>";
        });
      }
      $(selectId).html(items).val($(selectId).data("value"));
    },
  });
}

function ajaxUploadForm(args) {
  var imgParentDiv = args.imgParentDiv,
    imgName = args.imgName,
    _this = args._this,
    token = args.token;

  // multi/part  form submit
  $.ajax({
    url: $(_this).attr("action"),
    type: $(_this).attr("method"),
    headers: { authorization: "Bearer " + token },
    cache: false,
    contentType: false,
    processData: false,
    data: new FormData(_this),
    success: function (data) {
      if (data.status == "SUCCESS") {
        var setSrc = data.data.path.replace("public", "");
        $(imgParentDiv).append(`
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-2 item d-flex justify-content-center img-container">
            <input class="uploaded-files" type="hidden" name=${imgName} value=${setSrc} />
            <img class="m-1 img img-thumbnail" src=${setSrc} alt="" srcset="" width="360" height="360"/>
            <button type="button" class="btn remove-file">Remove</button>
          </div>`);
      }
    },
    error: function (data) {
      console.log("An error occurred.");
      console.log(data);
    },
  });
}

function swalWarning(args, position = "top", icon = "warning") {
  Swal.fire({
    position: position,
    icon: icon,
    title: args.title,
    text: args.text,
    buttonsStyling: true,
    showConfirmButton: true,
    confirmButtonText: "CLOSE",
    customClass: "swal-style",
  });
}
