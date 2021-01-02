/**
 * Scripts
 */

  function dataTableIndexRenderer() {
    return function(d, type, row, meta) {
      return parseInt("" + meta.row) + 1;
    };
  }

  function dataTableActiveRenderer() {
    return function(d, type, row) {
      var id = row.id;
      return d == true
        ? '<a class="btn btn-sm list-action" role="button" data-toggle="modal" data-target="#dialogDeactiveConfirm" \
          data-loading-text="Deleting..." data-id="' + id + '" title="Active"><i class="fa fa-dot-circle text-success"></i></a>'
        : '<a class="btn btn-sm list-action" role="button" data-toggle="modal" data-target="#dialogActiveConfirm" \
        data-loading-text="Deleting..." data-id="' + id + '" title="Inactive"><i class="fa fa-dot-circle text-danger"></i></a>';
    };
  }
  
  function dataTableNotiRenderer() {
    return function(d, type, row) {
      return d == true
        ? '<span class="badge badge-success" style="font-size:12px;">Yes</span>'
        : '<span class="badge badge-danger" style="font-size:12px;">No</span>';
    };
  }
  
  function dataTableMoneyRenderer() {
    return function(d, type, row) {
      return `<h4 style="text-align: right"><span class="badge badge-info" style="font-size:12px;">
        ${dataTableThousandSeperator(d)}
      </span></h4>`;
    };
  }
  
  function dataTableThousandSeperator(d) {
    return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  function dataTableCodeRenderer() {
    return function(d, type, row) {
      return `<h4><span class="badge badge-secondary" style="font-size:12px;">${d
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, "")}</span></h4>`;
    };
  }
  
  function dataTableActionsRenderer(editUrl, access) {
    var me = access.split(",");
    return function(d, type, row) {
      var id = row.id || "#";
      var html = "";
      if (me[0] == "1" && me[1] == "1")
        html +=
        '<div class="pull-right"><a class="btn btn-sm btn-warning list-action" href="./' + editUrl + "/" + id +
        '" title="Edit"><i class="fa fa-edit text-white"></i></a> ';
      if (me[2] == "1")
        html +=
        '<a class="btn btn-sm btn-danger list-action" role="button" data-toggle="modal" data-target="#dialogDeleteConfirm" \
         data-loading-text="Deleting..." data-id="' + id +
        '" title="Delete"><i class="fa fa-times text-white"></i></a></div>';
      return html;
    };
  }
  
  function dataTableSlicer() {
    return function(d, type, row) {
      if (d) return d.slice(0, 10) + "......";
      return "";
    };
  }
  
  function dataTableThumbnailRenderer() {
    return function(d, type, row) {
      // console.log("image render : "+JSON.stringify(row.image));
      var html =
        '<img src="' + d + '" height="30px" weight="100px" title="" alt="" />';
      // console.log(html);
      return html;
    };
  }
  
  function dataTableColumnFilter(column_name) {
    return function() {
      this.api()
        .columns(0)
        .every(function() {
          console.log("colmn work!");
          var column = this;
          var select = $('<select><option value="">[SELECT]</option></select>')
            .appendTo($(column.header()).html(column_name))
            .on("change", function() {
              var val = $.fn.dataTable.util.escapeRegex($(this).val());
              column.search(val ? "^" + val + "$" : "", true, false).draw();
            });
          column
            .data()
            .unique()
            .sort()
            .each(function(d, j) {
              select.append('<option value="' + d + '">' + d + "</option>");
            });
        });
    };
  }
  
  function dataTableActionsImageRenderer(editUrl, imageEditUrl) {
    return function(d, type, row) {
      const id = row.id || "#";
      return (
        '<a class="btn btn-warning list-action" href="./' +
        imageEditUrl +
        "/" +
        id +
        '" title="Edit Images"><i class="fa fa-picture"></i></a> \
      <a class="btn btn-warning list-action" href="./' +
        editUrl +
        "/" +
        id +
        '" title="Edit"><i class="fa fa-edit"></i></a> \
      <a class="btn btn-danger list-action" role="button" data-toggle="modal" data-target="#dialogDeleteConfirm" \
        data-loading-text="Deleting …" data-id="' +
        id +
        '" title="Delete"><i class="fa fa-trash"></i></a>'
      );
    };
  }
  
  function dataTableDateRenderer() {
    return $.fn.dataTable.render.date("YYYY-MM-DD", "DD/MM/YYYY");
  }
  
  function dataTableRenderDateTime() {
    return function(d, type, row) {
      d = toTableDateTime(d, "DD/MM/YYYY hh:mm A");
      return d;
    };
  }
  
  function toTableDateTime(dateVal, format) {
    if (typeof format != "string" || format == "") {
      format = "DD/MM/YYYY";
    }
    var dateObj = new Date();
    if (typeof dateVal === "string" && dateVal != "") {
      var fromFormat = "YYYY-MM-DD";
      if (dateVal.length > 10) {
        fromFormat = "YYYY-MM-DD HH:mm:ss";
      }
      dateObj = date.parse(dateVal, fromFormat);
    } else if (
      typeof dateVal === "object" &&
      typeof dateVal.getTime === "function"
    ) {
      dateObj = new Date(dateVal.getTime());
    }
    if (dateObj && typeof dateObj.getTime !== "function") {
      return "";
    }
  
    // var diff = 0;
    const diff = (6 * 60 + 30) * 60000;
    var current = new Date(dateObj.getTime() + diff);
    return date.format(current, format);
  }
  
  function isValidEmail(email) {
    return /^([a-zA-Z])+([a-zA-Z0-9_.+-])+\@(([a-zA-Z])+\.+?(com|co|in|org|net|edu|info|gov|vekomy))\.?(com|co|in|org|net|edu|info|gov)?$/.test(
      email
    );
  }
  
  // $(function() {});
  $('.selectpicker').select2();

  $('[data-hide="alert"]').on("click", function() {
    $(this)
      .closest("div.alert")
      .hide();
  });

  $('input[role="number"]')
    .on("keydown", function(e) {
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
    .on("paste", function(e) {
      // Get pasted data via clipboard API
      var clipboardData = e.clipboardData || window.clipboardData;
      var pastedData = clipboardData.getData("Text").toUpperCase();
      if (!/^[\d.]+/.test(pastedData)) {
        e.stopPropagation();
        e.preventDefault();
      }
    });

  $('input[role="phone"]')
    .on("keydown", function(e) {
      //alert(e.keyCode);
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
    .on("paste", function(e) {
      // Get pasted data via clipboard API
      var clipboardData = e.clipboardData || window.clipboardData;
      var pastedData = clipboardData.getData("Text").toUpperCase();
      if (!/^[\d/]+/.test(pastedData)) {
        e.stopPropagation();
        e.preventDefault();
      }
    });

  $('input[role="time"]')
    .on("keydown", function(e) {
      //alert(e.keyCode);
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
    .on("paste", function(e) {
      // Get pasted data via clipboard API
      var clipboardData = e.clipboardData || window.clipboardData;
      var pastedData = clipboardData.getData("Text").toUpperCase();
      if (!/^[\d/]+[:\.][\d/]+/.test(pastedData)) {
        e.stopPropagation();
        e.preventDefault();
      }
    });

  $('input[role="date"]')
    .on("keydown", function(e) {
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
    .on("paste", function(e) {
      // Get pasted data via clipboard API
      var clipboardData = e.clipboardData || window.clipboardData;
      var pastedData = clipboardData.getData("Text").toUpperCase();
      if (!/^[\d/]+/.test(pastedData)) {
        e.stopPropagation();
        e.preventDefault();
      }
    });

  $('input[editable="false"]')
    .on("keydown paste input propertychange", function(e) {
      e.stopPropagation();
      e.preventDefault();
    })
    .attr("autocomplete", "off")
    .attr("tabIndex", -1)
    .attr("focusable", false);

  var nowDate = new Date(Date.now());
  $("input.date").datepicker({
      format: "dd/mm/yyyy",
      autoclose: true,
      todayHighlight: true,
      orientation: "bottom"
    })
    .on("hide", function(e) {
      if (typeof e.date == "undefined" && $(this).val() == "") {
        $(this).val(window.date.format(nowDate, "DD/MM/YYYY"));
      }
    });
    $('input.fromdate').datepicker({
      format: "dd/mm/yyyy",
      autoclose: true,
      todayHighlight: true,
      orientation: 'bottom'
    }).on("changeDate", function (e) {
      var toid = $(this).attr('to');
      if (typeof toid !== 'undefined' && toid != '') {
        $("input[id='"+toid+"']").datepicker('setStartDate', e.date);
      } else {
        $("input.todate").datepicker('setStartDate', e.date);
      }
    });

    $('input.todate').datepicker({
      format: "dd/mm/yyyy",
      autoclose: true,
      todayHighlight: true,
      orientation: 'bottom'
    }).on("changeDate", function (e) {
      var fromid = $(this).attr('from');
      if (typeof fromid !== 'undefined' && fromid != '') {
        $("input[id='"+fromid+"']").datepicker('setEndDate', e.date);
      } else {
        $("input.fromdate").datepicker('setEndDate', e.date);
      }
    });

  function handleDelete(url, token, cb) {
    if (typeof url === "string" && url != "") {
      $.ajax({
        url: url,
        type: "delete",
        headers: { "authorization": "Bearer " + token },
        success: function(data) {
          if (typeof data !== "undefined" && data.status == "SUCCESS") {
            $("#alertDeleteError").hide();
            $("#alertDeleteSuccess").show();
            if (typeof cb === "function") {
              cb();
            }
          }
          else if (typeof data !== "undefined" && data.status == "FAIL"){
            /* if (data.message)
              $("#delErrorMsg").html(data.message) */
            $("#alertDeleteSuccess").hide();
            $("#alertDeleteError").show();
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert(errorThrown);
        }
      });
    }
  }

  function handleAlert(args) {
    if (args.status == "SUCCESS") {
      $("#alertTitle").html("Success: ");
      $("#alertMessage").html("Save Successful.");
      $("#alert").addClass("alert-success").show();

      var postFrm = $('#postSuccessForm');
      window.setTimeout(function(){
        postFrm.submit();
      }, 1 * 1000);
    } 
    else {
      $("#alertTitle").html("Error: ");
      $("#alertMessage").html("Save Unsuccessful.");
      $("#alert").addClass("alert-danger").show();

      window.setTimeout(function(){
        $('#alert').removeClass().hide();
      }, 1 * 1500);
    }
  }

  function handleMenuInPermissionEntry(args) {
      return '<li class="row pt-2 pb-2 pl-2"> \
                <label class="control-label col-sm-10 text-left pt-3 pl-2"> \
                  <span> \
                    <span data-feather="' + args.icon + '">' + args.title + '\
                  </span> \
                </label> \
                <div class="col-sm-2 btn-group pt-2" role="group"> \
                  <label class="label btn border-left border-right" role="button"> \
                    <input type="checkbox" class="pt-2 menu_check" id="access_menu_' + args.key + '" name="access_menu_' + args.key + '" value="1" aria-label="chkAccess"' + args.ischecked + '> &nbsp; Access \
                  </label> \
                </div> \
              </li>';
  }

  function handleSubMenuPermissionEntry(args) {
    return '<li class="row pt-2 pb-2 pl-2"> \
              <label class="control-label col-sm-8 text-left pt-3 pl-2"> \
                <span> \
                  <span class="">' + args.title + '\
                </span> \
              </label> \
              <div class="col-sm-4 btn-group pt-2 align-self-center" role="group"> \
                <label class="btn border-left border-right" role="button"> \
                  <input type="checkbox" class="sub_menu_check" id="add_access_submenu_'+ args.key + "_" + args.name + '" name="add_access_submenu_'+ args.key + "_" + args.name + '" value="1" aria-label="chkRead" ' + args.checkedAdd + '/> \
                  <i class="fa fa-eye text-primary ml-2"></i> \
                </label> \
                <label class="btn border-right" role="button"> \
                  <input type="checkbox" class="sub_menu_check" id="edit_access_submenu_'+ args.key + "_" + args.name + '" name="edit_access_submenu_'+ args.key + "_" + args.name + '" value="1" aria-label="chkRead" ' + args.checkedEdit + '/> \
                  <i class="fa fa-edit text-warning ml-2"></i> \
                </label> \
                <label class="btn border-right" role="button"> \
                  <input type="checkbox" class="sub_menu_check" id="delete_access_submenu_'+ args.key + "_" + args.name + '" name="delete_access_submenu_'+ args.key + "_" + args.name + '" value="1" aria-label="chkRead" ' + args.checkedDelete + '/> \
                  <i class="fa fa-times text-danger ml-2"></i> \
                </label> \
              </div> \
            </li> \
          ';
  }