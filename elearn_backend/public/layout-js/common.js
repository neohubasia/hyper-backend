/* *
 * Scripts
 */

    function dataTableIndexRenderer() {
      return function(d, type, row, meta) {
        return parseInt("" + meta.row) + 1;
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
  
  function dataTableActionsRenderer(editUrl, access, icons) {
    access = access.split(",");
    return function (d, type, row) {
      var id = row.id || "#";
      var html = "";
      if (access[0] == "1" && access[1] == "1") { // read && write access
        html +=
          '<div class="pull-right"><a class="btn btn-sm list-action" href="./' + editUrl + "/" + id +
          '" title="Edit"><img src="' + icons.edit + '" height="22" width="22"/></a> ';
      }
      if (access[2] == "1") { // delete access 
        html +=
          '<a class="btn btn-sm list-action" role="button" data-toggle="modal" data-target="#dialogDeleteConfirm" \
         data-loading-text="Deleting..." data-id="' + id + '" title="Delete"><img src="' + icons.delete + '" height="22" width="22"/></a></div>';
      }
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
      var html =
        '<img src="' + d + '" height="30px" weight="100px" title="" alt="" />';
      return html;
    };
  }
  
  function dataTableColumnFilter(column_name) {
    return function() {
      this.api()
      .columns(0)
      .every(function() {
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
  
  function dataTableDateRenderer() {
    return $.fn.dataTable.render.date("YYYY-MM-DD", "DD/MM/YYYY");
  }
  
  function dataTableRenderDateTime() {
    return function(d, type, row) {
      return toTableDateTime(d, "DD/MM/YYYY hh:mm A");
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
  
  $(function() {
    $(".list-group-item").on('click', function () {
      var eleIcon = this.getElementsByTagName("span")[2];
      var isExpand = $(this).closest('a.list-group-item').attr('aria-expanded'); // index return undefined
     
      (eleIcon.classList.contains("fa-plus"))
        ? eleIcon.classList.replace("fa-plus",  "fa-minus")
        : eleIcon.classList.replace("fa-minus",  "fa-plus");  
    });
  });

  $(".list-group .list-group-item-menu").on("click", function () {
    $(".list-group").find(".active").removeClass("active");
    $(this).addClass("active");
  });

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
  
  $('.selectpicker').select2({width: "100%"});

  function handleDelete(url, token, cb) {
    if (typeof url === "string" && url != "") {
      $.ajax({
        url: url,
        type: "delete",
        headers: { "authorization": "Bearer " + token },
        success: function (data) {
          console.log(data)
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

  function handleAlert(args,  redirect = true) {
    if (args.status == "SUCCESS") {
      $("#alertTitle").html("Success: ");
      $("#alertMessage").html("Save Successful.");
      $("#alert").addClass("alert-success").show();

      var postFrm = $('#postSuccessForm');
      window.setTimeout(function(){
        if (redirect) postFrm.submit();
        $('#alert').removeClass().hide();
      }, 1 * 1000);
    } 
    else {
      $("#alertTitle").html("Error: ");
      $("#alertMessage").html("Save Unsuccessful.");
      $("#alert").addClass("alert-danger").show();

      window.setTimeout(function(){
        $('#alert').removeClass().hide();
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
      headers: { "authorization": "Bearer " + token },
      data: { ...filerObj },
      success: function (data) {
        var items = "";
        items += "<option value='' disabled selected>[ Please Select ]</option>";
        if (data.status == "SUCCESS" && $.isArray(data.data)) {
          $.each(data.data, function (i, item) {
            items += "<option value='" + item['id'] + "'>" + item[showKey] + "</option>";
          });
        }
        else {
          $.each(Object.entries(data.data), function (i, item) {
            items += "<option value='" + item[0] + "'>" + item[0] + "</option>";
          });
        }
        $(selectId).html(items).val($(selectId).data('value'));
      }
    });
  }
   
  function ajaxUploadForm(args) {
    var imgParentDiv = args.imgParentDiv,
      _this  = args._this,
      token = args.token;
    
    // multi/part  form submit
    $.ajax( {
        url: $(_this).attr('action'),
        type: $(_this).attr('method'),
        headers: {"authorization": "Bearer " + token},
        cache: false,
        contentType: false,
        processData: false,
        data: new FormData( _this ),
        success: function (data) {
          console.log(data);
          //- handleAlert(data, false);
          if(data.status == "SUCCESS") {
            var setSrc = data.data.path.replace("public", "");
            var makeImage = `
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-2 item d-flex justify-content-center img-container">
                <input class="uploaded-files" type="hidden" name="profile_images[]" value=${setSrc} />
                <img class="m-1 img img-thumbnail" src=${setSrc} alt="" srcset="" width="360" height="360"/>
                <button type="button" class="btn remove-file">Remove</button>
              </div>`;
            //- alert($(".img-list").children().length);
            $(imgParentDiv).append(makeImage)
          }
        },
        error: function (data) {
          console.log('An error occurred.');
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
      customClass: 'swal-style',
    });
  }