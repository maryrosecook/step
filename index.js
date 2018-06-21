$(run);

function run() {
  view.setupInstructionHandlers(new Execution());
};

class Execution {
  constructor () {
    this.instructions = [0, 1, 2, 3, 4, 5, 8, 9, 10, 11,
                         6, 7, 3, 4, 5, 8, 9, 10, 11,
                         6, 7, 3, 4, 5, 8, 9, 10, 11,
                         6, 7, 3, 4, 5];
    this.ins = -1;
  }

  checkStep (event) {
    if (this.isComplete()) {
      return;
    }

    const ins = view.instruction(event);

    if (ins !== this.nextInstruction()) {
      view.markWrong(ins);
      return;
    }

    this.ins++;
    view.markCurrent(ins);

    if (this.isComplete()) {
      view.complete();
    }
  }

  nextInstruction () {
    return this.instructions[this.ins + 1];
  }

  isComplete () {
    return this.ins === this.instructions.length - 1;
  }
};

let view = {
  instruction: function(event) {
    return parseInt(event.target.classList.value.match(/i-(\d+)/)[1]);
  },

  markCurrent: function (id) {
    $(".ins").removeClass("wrong");
    $(".ins").removeClass("current");
    $(`.i-${id}`).addClass("current");
  },

  markWrong: function (id) {
    $(".ins").removeClass("wrong");
    $(`.i-${id}`).addClass("wrong");
  },

  setupInstructionHandlers: function(execution) {
    $(".ins").click(execution.checkStep.bind(execution));
  },

  complete: function() {
    $(`#complete`).show();
  }
};
