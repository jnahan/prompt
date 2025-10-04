import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PromptField from "./PromptField";

import { Copy, EyeIcon } from "lucide-react";

function PromptDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary">
          <EyeIcon className="h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-row min-w-[60vw] max-h-[80vh]">
        <section className="p-8 overflow-y-auto w-2/3">
          <DialogHeader className="mb-4">
            <DialogTitle>Prompt</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur. Ultrices aliquet iaculis
            fusce iaculis congue amet sed. Ornare cursus fermentum ultricies sed
            ipsum eu id feugiat. Id condimentum quam ut congue neque vulputate.
            Blandit tristique enim lacus mollis tortor malesuada pellentesque.
            Orci tellus est ultrices mattis ultricies ut ultricies urna elit.
            Semper arcu arcu lorem integer ipsum sit. Nec leo pretium sit
            blandit cras odio felis. Amet tristique aliquam elementum
            suspendisse egestas varius. Sit non vestibulum nibh orci in diam
            adipiscing donec et. Duis sem at aliquam risus. Porttitor varius
            nisl velit tempor volutpat. Nullam euismod integer augue orci sem
            imperdiet aliquet. Nec eget aliquet ut semper ultrices cursus arcu.
            Enim facilisis amet placerat quisque vel in sem vitae. Cursus nulla
            sit nec enim lorem. Praesent at turpis pellentesque nunc. Hendrerit
            non malesuada habitant nunc sit nibh velit habitasse. Risus mi ut
            pharetra mi integer commodo mi volutpat. Odio viverra felis a at.
            Vitae proin mattis congue tincidunt maecenas. Gravida elit urna in
            leo tempor elementum. Proin porttitor proin aliquam lacus aliquet.
            Pharetra phasellus condimentum ut phasellus auctor massa odio
            interdum aliquet. Felis et odio nunc eu massa ultrices ac. Morbi ac
            magna augue nunc donec feugiat non cursus.
          </p>
        </section>
        <section className="px-6 py-8 w-1/3 flex flex-col gap-4 border-l border-gray-200 overflow-y-auto">
          <PromptField />
          <PromptField />
          <PromptField />
          <PromptField />
          <Button>
            <Copy className="h-4 w-4" /> Copy prompt
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default PromptDialog;
