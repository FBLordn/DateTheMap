ext=".exe"
if [[ $(uname -a) == *"Linux"* ]]; then
  ext=""
fi
cd src-tauri
find . -name '*.profdata' -delete
find . -name '*.profraw' -delete
rustup component add llvm-tools
path=$(rustc --print sysroot)
machine=$(echo $path | awk -F "\\" '{print $NF}' | awk -F "/" '{print $NF}' | awk -F "-" '{for (i=2; i<=NF; i++) if ($i != "") { printf "-"$i; }}' | cut -c 2-)
rm -rf target/
RUSTFLAGS="-C instrument-coverage" cargo test --tests
"$path/lib/rustlib/$machine/bin/llvm-profdata$ext" merge -sparse default_*.profraw -o date_the_map.profdata
bin=$(find target/ -name "date_the_map-*$ext")
"$path/lib/rustlib/$machine/bin/llvm-cov$ext" show --use-color --ignore-filename-regex='(.*registry.*|.*build.*)' --instr-profile=date_the_map.profdata --object $bin --show-instantiations --show-line-counts-or-regions
"$path/lib/rustlib/$machine/bin/llvm-cov$ext" report --use-color --ignore-filename-regex='(.*registry.*|.*build.*)' --instr-profile=date_the_map.profdata --object $bin