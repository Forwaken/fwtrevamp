const controls = function () {
  const loadPrefs = function () {
    $('#settings .custom-size-w').val(fwt.getWidth());
    $('#settings .custom-size-h').val(fwt.getHeight());
    $('#settings .custom-level-s').val(fwt.getLevel());
    if (fwt.getShadeEnabled()) $('#settings #shades .alternate.true').addClass('s');
    else $('#settings #shades .alternate.false').addClass('s');
    if (fwt.getInvisibleEnabled()) $('#settings #invisibles .alternate.true').addClass('s');
    else $('#settings #invisibles .alternate.false').addClass('s');
    $(`#pieces #themescroller .alternate[data-value="${fwt.getColorTheme()}"]`).addClass('s');
    $(`#settings #speed .alternate[data-value="${fwt.getSpeed()}"]`).addClass('s');
    $(`#settings #rotation .alternate[data-value="${fwt.getRotation()}"]`).addClass('s');
    if (fwt.getSp1()) { $('#pieces #piecescroller .alternate.opt.sp1').addClass('s'); }
    if (fwt.getSp2()) { $('#pieces #piecescroller .alternate.opt.sp2').addClass('s'); }
    if (fwt.getSp3()) { $('#pieces #piecescroller .alternate.opt.sp3').addClass('s'); }
    if (fwt.getSp4()) { $('#pieces #piecescroller .alternate.opt.sp4').addClass('s'); }
    if (fwt.getSp5()) { $('#pieces #piecescroller .alternate.opt.sp5').addClass('s'); }
    if (fwt.getSp6()) { $('#pieces #piecescroller .alternate.opt.sp6').addClass('s'); }
    if (fwt.getSp7()) { $('#pieces #piecescroller .alternate.opt.sp7').addClass('s'); }
    if (fwt.getSp8()) { $('#pieces #piecescroller .alternate.opt.sp8').addClass('s'); }
    if (fwt.getSp9()) { $('#pieces #piecescroller .alternate.opt.sp9').addClass('s'); }
    if (fwt.getSp10()) { $('#pieces #piecescroller .alternate.opt.sp10').addClass('s'); }
    if (fwt.getSp11()) { $('#pieces #piecescroller .alternate.opt.sp11').addClass('s'); }
    if (fwt.getSp12()) { $('#pieces #piecescroller .alternate.opt.sp12').addClass('s'); }
    if (fwt.getSp13()) { $('#pieces #piecescroller .alternate.opt.sp13').addClass('s'); }
    if (fwt.getSp14()) { $('#pieces #piecescroller .alternate.opt.sp14').addClass('s'); }
    if (fwt.getSp15()) { $('#pieces #piecescroller .alternate.opt.sp15').addClass('s'); }
    if (fwt.getSp16()) { $('#pieces #piecescroller .alternate.opt.sp16').addClass('s'); }
    if (fwt.getSp17()) { $('#pieces #piecescroller .alternate.opt.sp17').addClass('s'); }
    if (fwt.getSp18()) { $('#pieces #piecescroller .alternate.opt.sp18').addClass('s'); }
    if (fwt.getSp19()) { $('#pieces #piecescroller .alternate.opt.sp19').addClass('s'); }
    if (fwt.getSp20()) { $('#pieces #piecescroller .alternate.opt.sp20').addClass('s'); }
    if (fwt.getSp21()) { $('#pieces #piecescroller .alternate.opt.sp21').addClass('s'); }
    if (fwt.getSp22()) { $('#pieces #piecescroller .alternate.opt.sp22').addClass('s'); }
    if (fwt.getSp23()) { $('#pieces #piecescroller .alternate.opt.sp23').addClass('s'); }
    if (fwt.getSp24()) { $('#pieces #piecescroller .alternate.opt.sp24').addClass('s'); }
    if (fwt.getSp25()) { $('#pieces #piecescroller .alternate.opt.sp25').addClass('s'); }
    if (fwt.getSp26()) { $('#pieces #piecescroller .alternate.opt.sp26').addClass('s'); }
    if (fwt.getSp27()) { $('#pieces #piecescroller .alternate.opt.sp27').addClass('s'); }
    if (fwt.getSp28()) { $('#pieces #piecescroller .alternate.opt.sp28').addClass('s'); }
    if (fwt.getSp29()) { $('#pieces #piecescroller .alternate.opt.sp29').addClass('s'); }
    if (fwt.getSp30()) { $('#pieces #piecescroller .alternate.opt.sp30').addClass('s'); }
    if (fwt.getSp31()) { $('#pieces #piecescroller .alternate.opt.sp31').addClass('s'); }
    if (fwt.getSp32()) { $('#pieces #piecescroller .alternate.opt.sp32').addClass('s'); }
    if (fwt.getSp33()) { $('#pieces #piecescroller .alternate.opt.sp33').addClass('s'); }
    if (fwt.getSp34()) { $('#pieces #piecescroller .alternate.opt.sp34').addClass('s'); }
    if (fwt.getSp35()) { $('#pieces #piecescroller .alternate.opt.sp35').addClass('s'); }
    if (fwt.getSp36()) { $('#pieces #piecescroller .alternate.opt.sp36').addClass('s'); }
    if (fwt.getSp37()) { $('#pieces #piecescroller .alternate.opt.sp37').addClass('s'); }
    if (fwt.getSp38()) { $('#pieces #piecescroller .alternate.opt.sp38').addClass('s'); }
    if (fwt.getSp39()) { $('#pieces #piecescroller .alternate.opt.sp39').addClass('s'); }
    if (fwt.getSp40()) { $('#pieces #piecescroller .alternate.opt.sp40').addClass('s'); }
    if (fwt.getSp41()) { $('#pieces #piecescroller .alternate.opt.sp41').addClass('s'); }
    if (fwt.getSp42()) { $('#pieces #piecescroller .alternate.opt.sp42').addClass('s'); }
    if (fwt.getSp43()) { $('#pieces #piecescroller .alternate.opt.sp43').addClass('s'); }
    if (fwt.getSp44()) { $('#pieces #piecescroller .alternate.opt.sp44').addClass('s'); }
    if (fwt.getSp45()) { $('#pieces #piecescroller .alternate.opt.sp45').addClass('s'); }
    if (fwt.getSp46()) { $('#pieces #piecescroller .alternate.opt.sp46').addClass('s'); }
    if (fwt.getSp47()) { $('#pieces #piecescroller .alternate.opt.sp47').addClass('s'); }
    if (fwt.getSp48()) { $('#pieces #piecescroller .alternate.opt.sp48').addClass('s'); }
    if (fwt.getSp49()) { $('#pieces #piecescroller .alternate.opt.sp49').addClass('s'); }
    if (fwt.getSp50()) { $('#pieces #piecescroller .alternate.opt.sp50').addClass('s'); }
    if (fwt.getSp51()) { $('#pieces #piecescroller .alternate.opt.sp51').addClass('s'); }
    if (fwt.getSp52()) { $('#pieces #piecescroller .alternate.opt.sp52').addClass('s'); }
    if (fwt.getSp53()) { $('#pieces #piecescroller .alternate.opt.sp53').addClass('s'); }
    if (fwt.getSp54()) { $('#pieces #piecescroller .alternate.opt.sp54').addClass('s'); }
    if (fwt.getSp55()) { $('#pieces #piecescroller .alternate.opt.sp55').addClass('s'); }
    if (fwt.getSp56()) { $('#pieces #piecescroller .alternate.opt.sp56').addClass('s'); }
    if (fwt.getSp57()) { $('#pieces #piecescroller .alternate.opt.sp57').addClass('s'); }
    if (fwt.getSp58()) { $('#pieces #piecescroller .alternate.opt.sp58').addClass('s'); }
    if (fwt.getSp59()) { $('#pieces #piecescroller .alternate.opt.sp59').addClass('s'); }
    if (fwt.getSp60()) { $('#pieces #piecescroller .alternate.opt.sp60').addClass('s'); }
    if (fwt.getSp61()) { $('#pieces #piecescroller .alternate.opt.sp61').addClass('s'); }
    if (fwt.getSp62()) { $('#pieces #piecescroller .alternate.opt.sp62').addClass('s'); }
    if (fwt.getSp63()) { $('#pieces #piecescroller .alternate.opt.sp63').addClass('s'); }
    if (fwt.getSp64()) { $('#pieces #piecescroller .alternate.opt.sp64').addClass('s'); }
    if (fwt.getSp65()) { $('#pieces #piecescroller .alternate.opt.sp65').addClass('s'); }
    if (fwt.getSp66()) { $('#pieces #piecescroller .alternate.opt.sp66').addClass('s'); }
    if (fwt.getSp67()) { $('#pieces #piecescroller .alternate.opt.sp67').addClass('s'); }
    if (fwt.getSp68()) { $('#pieces #piecescroller .alternate.opt.sp68').addClass('s'); }
    if (fwt.getSp69()) { $('#pieces #piecescroller .alternate.opt.sp69').addClass('s'); }
    if (fwt.getSp70()) { $('#pieces #piecescroller .alternate.opt.sp70').addClass('s'); }
    if (fwt.getSp71()) { $('#pieces #piecescroller .alternate.opt.sp71').addClass('s'); }
    if (fwt.getSp72()) { $('#pieces #piecescroller .alternate.opt.sp72').addClass('s'); }
    if (fwt.getSp73()) { $('#pieces #piecescroller .alternate.opt.sp73').addClass('s'); }
    if (fwt.getSp74()) { $('#pieces #piecescroller .alternate.opt.sp74').addClass('s'); }
    if (fwt.getSp75()) { $('#pieces #piecescroller .alternate.opt.sp75').addClass('s'); }
    if (fwt.getSp76()) { $('#pieces #piecescroller .alternate.opt.sp76').addClass('s'); }
    if (fwt.getSp77()) { $('#pieces #piecescroller .alternate.opt.sp77').addClass('s'); }
    if (fwt.getSp78()) { $('#pieces #piecescroller .alternate.opt.sp78').addClass('s'); }
    if (fwt.getSp79()) { $('#pieces #piecescroller .alternate.opt.sp79').addClass('s'); }
    if (fwt.getSp80()) { $('#pieces #piecescroller .alternate.opt.sp80').addClass('s'); }
    if (fwt.getSp81()) { $('#pieces #piecescroller .alternate.opt.sp81').addClass('s'); }
    if (fwt.getSp82()) { $('#pieces #piecescroller .alternate.opt.sp82').addClass('s'); }
    if (fwt.getSp83()) { $('#pieces #piecescroller .alternate.opt.sp83').addClass('s'); }
    if (fwt.getSp84()) { $('#pieces #piecescroller .alternate.opt.sp84').addClass('s'); }
    if (fwt.getSp85()) { $('#pieces #piecescroller .alternate.opt.sp85').addClass('s'); }
    if (fwt.getSp86()) { $('#pieces #piecescroller .alternate.opt.sp86').addClass('s'); }
    if (fwt.getSp87()) { $('#pieces #piecescroller .alternate.opt.sp87').addClass('s'); }
    if (fwt.getSp88()) { $('#pieces #piecescroller .alternate.opt.sp88').addClass('s'); }
    if (fwt.getSp89()) { $('#pieces #piecescroller .alternate.opt.sp89').addClass('s'); }
    if (fwt.getSp90()) { $('#pieces #piecescroller .alternate.opt.sp90').addClass('s'); }
    if (fwt.getSp91()) { $('#pieces #piecescroller .alternate.opt.sp91').addClass('s'); }

    if (fwt.getMat1()) { $('#pieces #materialscroller .alternate.opt.mat1').addClass('s'); }
    if (fwt.getMat2()) { $('#pieces #materialscroller .alternate.opt.mat2').addClass('s'); }
    if (fwt.getMat3()) { $('#pieces #materialscroller .alternate.opt.mat3').addClass('s'); }
    if (fwt.getMat4()) { $('#pieces #materialscroller .alternate.opt.mat4').addClass('s'); }

    $('#settings #sizes .val').removeClass('not1 not2');
  };

  // Shades:
  $('#settings #shades .alternate.false').click(function () {
    $(this).addClass('s');
    $(this).parent().children('.true').removeClass('s');
    fwt.switchShades(false);
  });
  $('#settings #shades .alternate.true').click(function () {
    $(this).addClass('s');
    $(this).parent().children('.false').removeClass('s');
    fwt.switchShades(true);
  });

  // Invisible:
  $('#settings #invisibles .alternate.false').click(function () {
    $(this).addClass('s');
    $(this).parent().children('.true').removeClass('s');
    fwt.switchInvisibles(false);
    ui.stopGame();
  });
  $('#settings #invisibles .alternate.true').click(function () {
    $(this).addClass('s');
    $(this).parent().children('.false').removeClass('s');
    fwt.switchInvisibles(true);
    ui.stopGame();
  });

  // Themes:
  $('#pieces #themescroller .alternate.opt').click(function () {
    $('#pieces #themescroller .alternate').removeClass('s');
    $(this).addClass('s');
    fwt.switchTheme($(this).attr('data-value'));
    fwt.repaintNextPiece();
  });

  // Speed:
  $('#settings #speed .alternate.opt').click(function () {
    $('#settings #speed .alternate').removeClass('s');
    $(this).addClass('s');
    fwt.switchSpeed($(this).attr('data-value'));
    ui.stopGame();
  });

  // Piece Selection:
  $('#pieces #piecescroller .alternate.opt.sp1').click(function () {
    if (fwt.getSp1()) {
      $(this).removeClass('s');
      fwt.switchSp1(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp1(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp2').click(function () {
    if (fwt.getSp2()) {
      $(this).removeClass('s');
      fwt.switchSp2(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp2(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp3').click(function () {
    if (fwt.getSp3()) {
      $(this).removeClass('s');
      fwt.switchSp3(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp3(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp4').click(function () {
    if (fwt.getSp4()) {
      $(this).removeClass('s');
      fwt.switchSp4(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp4(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp5').click(function () {
    if (fwt.getSp5()) {
      $(this).removeClass('s');
      fwt.switchSp5(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp5(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp6').click(function () {
    if (fwt.getSp6()) {
      $(this).removeClass('s');
      fwt.switchSp6(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp6(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp7').click(function () {
    if (fwt.getSp7()) {
      $(this).removeClass('s');
      fwt.switchSp7(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp7(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp8').click(function () {
    if (fwt.getSp8()) {
      $(this).removeClass('s');
      fwt.switchSp8(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp8(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp9').click(function () {
    if (fwt.getSp9()) {
      $(this).removeClass('s');
      fwt.switchSp9(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp9(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp10').click(function () {
    if (fwt.getSp10()) {
      $(this).removeClass('s');
      fwt.switchSp10(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp10(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp11').click(function () {
    if (fwt.getSp11()) {
      $(this).removeClass('s');
      fwt.switchSp11(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp11(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp12').click(function () {
    if (fwt.getSp12()) {
      $(this).removeClass('s');
      fwt.switchSp12(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp12(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp13').click(function () {
    if (fwt.getSp13()) {
      $(this).removeClass('s');
      fwt.switchSp13(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp13(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp14').click(function () {
    if (fwt.getSp14()) {
      $(this).removeClass('s');
      fwt.switchSp14(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp14(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp15').click(function () {
    if (fwt.getSp15()) {
      $(this).removeClass('s');
      fwt.switchSp15(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp15(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp16').click(function () {
    if (fwt.getSp16()) {
      $(this).removeClass('s');
      fwt.switchSp16(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp16(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp17').click(function () {
    if (fwt.getSp17()) {
      $(this).removeClass('s');
      fwt.switchSp17(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp17(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp18').click(function () {
    if (fwt.getSp18()) {
      $(this).removeClass('s');
      fwt.switchSp18(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp18(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp19').click(function () {
    if (fwt.getSp19()) {
      $(this).removeClass('s');
      fwt.switchSp19(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp19(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp20').click(function () {
    if (fwt.getSp20()) {
      $(this).removeClass('s');
      fwt.switchSp20(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp20(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp21').click(function () {
    if (fwt.getSp21()) {
      $(this).removeClass('s');
      fwt.switchSp21(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp21(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp22').click(function () {
    if (fwt.getSp22()) {
      $(this).removeClass('s');
      fwt.switchSp22(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp22(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp23').click(function () {
    if (fwt.getSp23()) {
      $(this).removeClass('s');
      fwt.switchSp23(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp23(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp24').click(function () {
    if (fwt.getSp24()) {
      $(this).removeClass('s');
      fwt.switchSp24(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp24(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp25').click(function () {
    if (fwt.getSp25()) {
      $(this).removeClass('s');
      fwt.switchSp25(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp25(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp26').click(function () {
    if (fwt.getSp26()) {
      $(this).removeClass('s');
      fwt.switchSp26(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp26(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp27').click(function () {
    if (fwt.getSp27()) {
      $(this).removeClass('s');
      fwt.switchSp27(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp27(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp28').click(function () {
    if (fwt.getSp28()) {
      $(this).removeClass('s');
      fwt.switchSp28(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp28(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp29').click(function () {
    if (fwt.getSp29()) {
      $(this).removeClass('s');
      fwt.switchSp29(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp29(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp30').click(function () {
    if (fwt.getSp30()) {
      $(this).removeClass('s');
      fwt.switchSp30(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp30(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp31').click(function () {
    if (fwt.getSp31()) {
      $(this).removeClass('s');
      fwt.switchSp31(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp31(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp32').click(function () {
    if (fwt.getSp32()) {
      $(this).removeClass('s');
      fwt.switchSp32(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp32(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp33').click(function () {
    if (fwt.getSp33()) {
      $(this).removeClass('s');
      fwt.switchSp33(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp33(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp34').click(function () {
    if (fwt.getSp34()) {
      $(this).removeClass('s');
      fwt.switchSp34(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp34(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp35').click(function () {
    if (fwt.getSp35()) {
      $(this).removeClass('s');
      fwt.switchSp35(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp35(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp36').click(function () {
    if (fwt.getSp36()) {
      $(this).removeClass('s');
      fwt.switchSp36(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp36(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp37').click(function () {
    if (fwt.getSp37()) {
      $(this).removeClass('s');
      fwt.switchSp37(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp37(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp38').click(function () {
    if (fwt.getSp38()) {
      $(this).removeClass('s');
      fwt.switchSp38(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp38(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp39').click(function () {
    if (fwt.getSp39()) {
      $(this).removeClass('s');
      fwt.switchSp39(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp39(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp40').click(function () {
    if (fwt.getSp40()) {
      $(this).removeClass('s');
      fwt.switchSp40(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp40(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp41').click(function () {
    if (fwt.getSp41()) {
      $(this).removeClass('s');
      fwt.switchSp41(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp41(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp42').click(function () {
    if (fwt.getSp42()) {
      $(this).removeClass('s');
      fwt.switchSp42(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp42(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp43').click(function () {
    if (fwt.getSp43()) {
      $(this).removeClass('s');
      fwt.switchSp43(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp43(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp44').click(function () {
    if (fwt.getSp44()) {
      $(this).removeClass('s');
      fwt.switchSp44(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp44(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp45').click(function () {
    if (fwt.getSp45()) {
      $(this).removeClass('s');
      fwt.switchSp45(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp45(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp46').click(function () {
    if (fwt.getSp46()) {
      $(this).removeClass('s');
      fwt.switchSp46(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp46(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp47').click(function () {
    if (fwt.getSp47()) {
      $(this).removeClass('s');
      fwt.switchSp47(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp47(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp48').click(function () {
    if (fwt.getSp48()) {
      $(this).removeClass('s');
      fwt.switchSp48(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp48(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp49').click(function () {
    if (fwt.getSp49()) {
      $(this).removeClass('s');
      fwt.switchSp49(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp49(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp50').click(function () {
    if (fwt.getSp50()) {
      $(this).removeClass('s');
      fwt.switchSp50(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp50(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp51').click(function () {
    if (fwt.getSp51()) {
      $(this).removeClass('s');
      fwt.switchSp51(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp51(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp52').click(function () {
    if (fwt.getSp52()) {
      $(this).removeClass('s');
      fwt.switchSp52(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp52(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp53').click(function () {
    if (fwt.getSp53()) {
      $(this).removeClass('s');
      fwt.switchSp53(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp53(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp54').click(function () {
    if (fwt.getSp54()) {
      $(this).removeClass('s');
      fwt.switchSp54(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp54(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp55').click(function () {
    if (fwt.getSp55()) {
      $(this).removeClass('s');
      fwt.switchSp55(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp55(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp56').click(function () {
    if (fwt.getSp56()) {
      $(this).removeClass('s');
      fwt.switchSp56(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp56(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp57').click(function () {
    if (fwt.getSp57()) {
      $(this).removeClass('s');
      fwt.switchSp57(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp57(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp58').click(function () {
    if (fwt.getSp58()) {
      $(this).removeClass('s');
      fwt.switchSp58(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp58(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp59').click(function () {
    if (fwt.getSp59()) {
      $(this).removeClass('s');
      fwt.switchSp59(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp59(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp60').click(function () {
    if (fwt.getSp60()) {
      $(this).removeClass('s');
      fwt.switchSp60(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp60(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp61').click(function () {
    if (fwt.getSp61()) {
      $(this).removeClass('s');
      fwt.switchSp61(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp61(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp62').click(function () {
    if (fwt.getSp62()) {
      $(this).removeClass('s');
      fwt.switchSp62(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp62(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp63').click(function () {
    if (fwt.getSp63()) {
      $(this).removeClass('s');
      fwt.switchSp63(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp63(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp64').click(function () {
    if (fwt.getSp64()) {
      $(this).removeClass('s');
      fwt.switchSp64(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp64(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp65').click(function () {
    if (fwt.getSp65()) {
      $(this).removeClass('s');
      fwt.switchSp65(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp65(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp66').click(function () {
    if (fwt.getSp66()) {
      $(this).removeClass('s');
      fwt.switchSp66(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp66(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp67').click(function () {
    if (fwt.getSp67()) {
      $(this).removeClass('s');
      fwt.switchSp67(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp67(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp68').click(function () {
    if (fwt.getSp68()) {
      $(this).removeClass('s');
      fwt.switchSp68(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp68(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp69').click(function () {
    if (fwt.getSp69()) {
      $(this).removeClass('s');
      fwt.switchSp69(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp69(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp70').click(function () {
    if (fwt.getSp70()) {
      $(this).removeClass('s');
      fwt.switchSp70(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp70(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp71').click(function () {
    if (fwt.getSp71()) {
      $(this).removeClass('s');
      fwt.switchSp71(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp71(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp72').click(function () {
    if (fwt.getSp72()) {
      $(this).removeClass('s');
      fwt.switchSp72(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp72(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp73').click(function () {
    if (fwt.getSp73()) {
      $(this).removeClass('s');
      fwt.switchSp73(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp73(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp74').click(function () {
    if (fwt.getSp74()) {
      $(this).removeClass('s');
      fwt.switchSp74(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp74(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp75').click(function () {
    if (fwt.getSp75()) {
      $(this).removeClass('s');
      fwt.switchSp75(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp75(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp76').click(function () {
    if (fwt.getSp76()) {
      $(this).removeClass('s');
      fwt.switchSp76(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp76(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp77').click(function () {
    if (fwt.getSp77()) {
      $(this).removeClass('s');
      fwt.switchSp77(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp77(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp78').click(function () {
    if (fwt.getSp78()) {
      $(this).removeClass('s');
      fwt.switchSp78(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp78(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp79').click(function () {
    if (fwt.getSp79()) {
      $(this).removeClass('s');
      fwt.switchSp79(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp79(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp80').click(function () {
    if (fwt.getSp80()) {
      $(this).removeClass('s');
      fwt.switchSp80(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp80(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp81').click(function () {
    if (fwt.getSp81()) {
      $(this).removeClass('s');
      fwt.switchSp81(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp81(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp82').click(function () {
    if (fwt.getSp82()) {
      $(this).removeClass('s');
      fwt.switchSp82(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp82(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp83').click(function () {
    if (fwt.getSp83()) {
      $(this).removeClass('s');
      fwt.switchSp83(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp83(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp84').click(function () {
    if (fwt.getSp84()) {
      $(this).removeClass('s');
      fwt.switchSp84(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp84(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp85').click(function () {
    if (fwt.getSp85()) {
      $(this).removeClass('s');
      fwt.switchSp85(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp85(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp86').click(function () {
    if (fwt.getSp86()) {
      $(this).removeClass('s');
      fwt.switchSp86(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp86(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp87').click(function () {
    if (fwt.getSp87()) {
      $(this).removeClass('s');
      fwt.switchSp87(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp87(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp88').click(function () {
    if (fwt.getSp88()) {
      $(this).removeClass('s');
      fwt.switchSp88(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp88(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp89').click(function () {
    if (fwt.getSp89()) {
      $(this).removeClass('s');
      fwt.switchSp89(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp89(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp90').click(function () {
    if (fwt.getSp90()) {
      $(this).removeClass('s');
      fwt.switchSp90(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp90(true);
    }
    ui.stopGame();
  });
  $('#pieces #piecescroller .alternate.opt.sp91').click(function () {
    if (fwt.getSp91()) {
      $(this).removeClass('s');
      fwt.switchSp91(false);
    } else {
      $(this).addClass('s');
      fwt.switchSp91(true);
    }
    ui.stopGame();
  });

  // Materials:
  $('#pieces #materialscroller .alternate.opt.mat1').click(function () {
    if (fwt.getMat1()) {
      $(this).removeClass('s');
      fwt.switchMat1(false);
    } else {
      $(this).addClass('s');
      fwt.switchMat1(true);
    }
    ui.stopGame();
  });
  $('#pieces #materialscroller .alternate.opt.mat2').click(function () {
    if (fwt.getMat2()) {
      $(this).removeClass('s');
      fwt.switchMat2(false);
    } else {
      $(this).addClass('s');
      fwt.switchMat2(true);
    }
    ui.stopGame();
  });
  $('#pieces #materialscroller .alternate.opt.mat3').click(function () {
    if (fwt.getMat3()) {
      $(this).removeClass('s');
      fwt.switchMat3(false);
    } else {
      $(this).addClass('s');
      fwt.switchMat3(true);
    }
    ui.stopGame();
  });
  $('#pieces #materialscroller .alternate.opt.mat4').click(function () {
    if (fwt.getMat4()) {
      $(this).removeClass('s');
      fwt.switchMat4(false);
    } else {
      $(this).addClass('s');
      fwt.switchMat4(true);
    }
    ui.stopGame();
  });

  // Rotation:
  $('#settings #rotation .alternate.opt').click(function () {
    $('#settings #rotation .alternate').removeClass('s');
    $(this).addClass('s');
    fwt.switchRotation($(this).attr('data-value'));
  });

  // Sizes:
  $('#settings #sizes .custom-size-w').keyup(function () {
    w = $(this).val();
    if (isNaN(w) || w < 1 || w > 100) {
      $('#settings #sizes .val').addClass('not1');
      fwt.setWidth(10);
    } else {
      $('#settings #sizes .val').removeClass('not1');
      fwt.setWidth(w);
    }
    ui.stopGame();
  });

  $('#settings #sizes .custom-size-h').keyup(function () {
    h = $(this).val();
    if (isNaN(h) || h < 1 || h > 100) {
      $('#settings #sizes .val').addClass('not2');
      fwt.setHeight(24);
    } else {
      $('#settings #sizes .val').removeClass('not2');
      fwt.setHeight(h);
    }
    ui.stopGame();
  });

  // Level Customization:
  $('#settings #startlevel .custom-level-s').keyup(function () {
    s = $(this).val();
    if (isNaN(s) || s < 0 || s > 999) {
      $('#settings #startlevel .val').addClass('not1');
      fwt.setLevel(0);
    } else {
      $('#settings #startlevel .val').removeClass('not1');
      fwt.setLevel(s);
    }
    ui.stopGame();
  });

  // Seed:
  $('#settings #seed .custom-seed-n').keyup(function () {
    n = $(this).val();
    fwt.setSeed(n);
  });

  this.loadPrefs = loadPrefs;
};

const cmd = new controls();
